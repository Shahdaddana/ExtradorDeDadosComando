@echo off
setlocal
set "SCRIPT_NAME=%~n0"
node index.js "%SCRIPT_NAME%"
pause