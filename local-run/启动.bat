@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================
echo  ForumFlash 英文学习网站 - 最新源码本地运行
echo ========================================
echo.
echo [1/3] 构建最新前端...
call npm run build:client
if errorlevel 1 goto :fail
echo [2/3] 构建后端接口...
call npm run build:backend
if errorlevel 1 goto :fail
echo [3/3] 启动服务 http://127.0.0.1:60002/ ...
start "" http://127.0.0.1:60002/
node server.mjs
goto :eof

:fail
echo 构建失败，请检查上方错误信息。
pause
