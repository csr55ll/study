@echo off
echo 🚀 启动 MyChronicle 本地服务器...
echo.

REM 检查Python是否安装
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ 检测到Python，启动HTTP服务器...
    echo 📍 服务器地址: http://localhost:3000
    echo 📍 项目目录: %cd%
    echo.
    echo 按 Ctrl+C 停止服务器
    echo.
    python -m http.server 3000
) else (
    echo ❌ 未检测到Python
    echo.
    echo 请选择以下方案之一：
    echo 1. 安装Python: https://www.python.org/downloads/
    echo 2. 使用VS Code Live Server扩展
    echo 3. 直接双击index.html文件
    echo.
    pause
)


