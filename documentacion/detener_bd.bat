@echo off
cd /d "%~dp0"
echo Deteniendo PostgreSQL local...
pgsql\bin\pg_ctl.exe -D pgsql\data stop
echo.
echo PostgreSQL detenido exitosamente.
echo Esta ventana se cerrara automaticamente en 3 segundos...
timeout /t 3 /nobreak > nul
