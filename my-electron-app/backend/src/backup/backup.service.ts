import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BackupService {
  constructor(private configService: ConfigService) {}

  async createBackup(): Promise<string> {
    return new Promise((resolve, reject) => {
      const backupFileName = `backup-${Date.now()}.dump`;
      const backupPath = path.join(__dirname, backupFileName);

      const dbHost = this.configService.get<string>('DB_HOST');
      const dbPort = this.configService.get<string>('DB_PORT');
      const dbUser = this.configService.get<string>('DB_USERNAME');
      const dbPassword = this.configService.get<string>('DB_PASSWORD');
      const dbName = this.configService.get<string>('DB_NAME');
      const env = { ...process.env, PGPASSWORD: dbPassword };

      const pgDumpPath = process.platform === 'win32' ? '"D:\\Programs\\PostgeSQL\\bin\\pg_dump.exe"' : 'pg_dump';

      const dumpCommand = `${pgDumpPath} -h ${dbHost} -p ${dbPort} -U ${dbUser} -F c -f ${backupPath} ${dbName}`;

      exec(dumpCommand, { env }, async (error) => {
        if (error) {
          console.error('Ошибка при создании бэкапа:', error);
          return reject(error);
        }

        try {
          const uploadedFileId = await this.uploadToDrive(backupPath);
          fs.unlinkSync(backupPath); // Удаляем локальный файл после загрузки
          resolve(uploadedFileId);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  private async uploadToDrive(filePath: string): Promise<string> {
    const auth = new google.auth.GoogleAuth({
      keyFile: this.configService.get<string>('GOOGLE_SERVICE_ACCOUNT_KEY'),
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });
    const folderId = this.configService.get<string>('GOOGLE_DRIVE_FOLDER_ID');

    const response = await drive.files.create({
      requestBody: {
        name: path.basename(filePath),
        parents: [folderId],
      },
      media: { body: fs.createReadStream(filePath) },
    });

    return response.data.id;
  }
}
