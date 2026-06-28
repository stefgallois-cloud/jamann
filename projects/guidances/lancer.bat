@echo off
cd /d "%~dp0"
echo Lancement du script de transcription...
python transcrire.py
if %errorlevel% neq 0 (
  py transcrire.py
)
pause
