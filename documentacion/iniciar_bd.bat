@echo off
cd /d "%~dp0"
echo Iniciando PostgreSQL de forma local...
pgsql\bin\pg_ctl.exe -D pgsql\data -l pgsql\logfile start
echo.
echo PostgreSQL iniciado. El servidor ahora se ejecuta en segundo plano.
echo Esta ventana se cerrara automaticamente en 3 segundos...
timeout /t 3 /nobreak > nul
