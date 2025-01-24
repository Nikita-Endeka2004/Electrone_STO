import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class EndProcesService {
  end() {
    exec('taskkill /IM node.exe /F', (error, stdout, stderr) => {
      if (error) {
        console.error(`Ошибка при завершении: ${stderr}`);
        return;
      }
      console.log(`Процессы завершены: ${stdout}`);
    });
    return 'Проект остановлен';
  }
  test(){
    return 'Test';
  }

}
