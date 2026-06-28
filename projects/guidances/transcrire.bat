@echo off
chcp 65001 >nul
echo ============================================
echo   TRANSCRIPTION WHISPER - Guidance Stéphanie
echo ============================================
echo.

echo [1/3] Vérification de Python...
python --version
if %errorlevel% neq 0 (
    echo ERREUR: Python n'est pas installé ou pas dans le PATH.
    pause
    exit /b 1
)

echo.
echo [2/3] Installation de openai-whisper...
pip install openai-whisper -q
if %errorlevel% neq 0 (
    echo ERREUR lors de l'installation de whisper.
    pause
    exit /b 1
)
echo Whisper installé !

echo.
echo [3/3] Lancement de la transcription (peut prendre 20-40 minutes)...
echo Le fichier de sortie sera dans le même dossier que cet audio.
echo.

whisper "C:\Users\DELL\Desktop\test claude\projects\guidances\Guidance Stéphanie 20.03.26 (1).m4a" --language French --model small --output_dir "C:\Users\DELL\Desktop\test claude\projects\guidances" --output_format txt

if %errorlevel% neq 0 (
    echo ERREUR lors de la transcription.
    pause
    exit /b 1
)

echo.
echo ============================================
echo   TRANSCRIPTION TERMINÉE !
echo   Fichier créé : Guidance Stéphanie 20.03.26 (1).txt
echo ============================================
pause
