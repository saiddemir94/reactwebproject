@echo off
setlocal

cd /d "%~dp0"

echo =====================================
echo PaperShelf proje test araci basladi
echo =====================================
echo.

where npm >nul 2>nul
if errorlevel 1 (
  echo HATA: npm bulunamadi. Lutfen Node.js kurulumunu kontrol edin.
  echo.
  pause
  exit /b 1
)

if not exist node_modules (
  echo node_modules bulunamadi. Bagimliliklar kuruluyor...
  call npm install
  if errorlevel 1 (
    echo.
    echo HATA: npm install basarisiz oldu.
    pause
    exit /b 1
  )
) else (
  echo Bagimliliklar hazir.
)

echo.
echo Derleme testi calistiriliyor...
call npm run build

if errorlevel 1 (
  echo.
  echo SONUC: Test basarisiz. Derleme asamasinda hata olustu.
  pause
  exit /b 1
)

echo.
echo SONUC: Test basarili. Proje derleme kontrolunu gecti.
echo Preview sunucusu baslatiliyor...
start "PaperShelf Preview" cmd /k "cd /d ""%~dp0"" && npm run preview -- --host 127.0.0.1 --port 4173 --strictPort"
timeout /t 3 /nobreak >nul
echo.
echo Yerel test linki: http://127.0.0.1:4173
start "" "http://127.0.0.1:4173"
echo.
pause
