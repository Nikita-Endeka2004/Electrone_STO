@echo off

:: Переход в директорию серверной части и запуск NestJS
cd /d "%~dp0my-electron-app\backend"
start /b npm run start:dev

:: Переход в директорию клиентской части и запуск Vite
cd /d "%~dp0my-electron-app\frontend"
start /b npm run dev

:: Подождите несколько секунд, пока Vite выдаст URL (или настройте таймаут вручную)
timeout /t 10 >nul

:: Открытие URL в браузере по умолчанию
start "" "http://localhost:5173"
