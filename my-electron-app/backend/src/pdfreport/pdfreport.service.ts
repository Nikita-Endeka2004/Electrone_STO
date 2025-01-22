import { Injectable, NotFoundException } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { join } from 'path';
import { exec } from 'child_process';
import * as handlebars from 'handlebars';
import { WorkService } from 'src/work/work.service';
import { UserService } from 'src/user/user.service';
import { promisify } from 'util';

const execPromise = promisify(exec);

@Injectable()
export class PdfreportService {
  constructor(
  private readonly workService: WorkService,
  private readonly userService: UserService,
 ){}
 private readonly pdfDirectory = path.resolve(__dirname, '../../../data/pdfs')

 private getUniqueFilePath(basePath: string, extension: string): string {
    let filePath = `${basePath}.${extension}`;
    let counter = 1;

    // Пока файл существует, добавляем числовую приписку
    while (fs.existsSync(filePath)) {
      filePath = `${basePath}_${counter}.${extension}`;
      counter++;
    }

    return filePath;
  }

  async create(): Promise<void> {
    // Получаем данные из сервисов
    const workData = await this.workService.findAll();
    const lastUser = await this.userService.findLatest(); 
    const user = lastUser[0]
    
    // Считаем общую стоимость
    const totalCost = workData.reduce((sum, item) => sum/1 + item.amount/1, 0);
    // Текущая дата
    const currentDate = new Date().toLocaleDateString();

    const workDataWithIndex = workData.map((item, index) => ({
      ...item,
      displayIndex: index + 1, // Индекс с 1
    }));

    // Подготавливаем данные для шаблона
    const templateData = {
      user,
      data: workDataWithIndex,
      totalCost,
      currentDate,
    };

    // Читаем HTML-шаблон
    const templatePath = path.resolve(__dirname, '../../../data/template.html');
    const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    // Компилируем шаблон с данными
    const compiledTemplate = handlebars.compile(htmlTemplate);
    const html = compiledTemplate(templateData);

    // Используем Puppeteer для создания PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Определяем путь сохранения PDF
    if (!fs.existsSync(this.pdfDirectory)) {
      fs.mkdirSync(this.pdfDirectory);
    }

    const basePdfPath = path.resolve(this.pdfDirectory, `${user.vin}_${user.car_number}_${user.fio}`);
    const pdfPath = this.getUniqueFilePath(basePdfPath, 'pdf');

    await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });
    const command = `start "" "${pdfPath}"`;
    await execPromise(command);
    await browser.close();
  }

  async findAll(searchTerm: string): Promise<string[]> {
    try {
      const files = await fsPromises.readdir(this.pdfDirectory);
      const searchTermLower = searchTerm.toLowerCase();
      
      const matchingFiles = files.filter(file => 
        file.toLowerCase().includes(searchTermLower)
      );

      return matchingFiles;
    } catch (error) {
      throw new Error(`Error reading PDF files: ${error.message}`);
    }
  }
  async openPdfByName(fileName: string): Promise<void> {
    try {
      const filePath = join(this.pdfDirectory, fileName);

      // Команда для открытия файла в Windows
      const command = `start "" "${filePath}"`;

      // Выполнение команды
      await execPromise(command);
    } catch (error) {
      throw new NotFoundException('Не удалось открыть файл: ' + error.message);
    }
  }
}
