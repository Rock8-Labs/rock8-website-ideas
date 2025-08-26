@echo off
echo Starting Rock8.io website server...
echo.
echo Access your website at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
cd /d "%~dp0"
python -m http.server 3000
pause