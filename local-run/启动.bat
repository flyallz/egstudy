@echo off
chcp 65001 >nul
set "PORT=60003"
echo ========================================
echo  ForumFlash 英文学习网站 - 最新源码本地运行
echo ========================================
echo.
echo [1/3] 构建最新前端...
call npm run build:client --prefix "%~dp0."
if errorlevel 1 goto :fail
echo [2/3] 构建后端接口...
call npm run build:backend --prefix "%~dp0."
if errorlevel 1 goto :fail
echo [3/3] 检查 http://127.0.0.1:%PORT%/ ...
powershell -NoProfile -Command "try { $r = Invoke-WebRequest -Uri 'http://127.0.0.1:%PORT%/' -UseBasicParsing -TimeoutSec 2; if ($r.StatusCode -eq 200) { exit 0 } } catch {} ; exit 1" >nul 2>&1
if not errorlevel 1 (
    echo 站点已在运行，正在打开 http://127.0.0.1:%PORT%/
    start "" "http://127.0.0.1:%PORT%/"
    goto :eof
)
echo 启动服务 http://127.0.0.1:%PORT%/ ...
start "" "http://127.0.0.1:%PORT%/"
node "%~dp0server.mjs"
goto :eof

:fail
echo 构建失败，请检查上方错误信息。
pause
