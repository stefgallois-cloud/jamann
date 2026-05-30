Write-Host "--- INSTALLATION ET CONFIGURATION D'AUDACITY ---" -ForegroundColor Cyan

# 1. Installation d'Audacity via Winget
Write-Host "1. Téléchargement et installation d'Audacity en cours..." -ForegroundColor Yellow
winget install --id Audacity.Audacity --accept-package-agreements --accept-source-agreements --silent

if ($LASTEXITCODE -eq 0) {
    Write-Host "   [SUCCÈS] Audacity a été installé avec succès !" -ForegroundColor Green
} else {
    Write-Host "   [AVERTISSEMENT] Winget a retourné un code d'erreur ($LASTEXITCODE). L'installation a peut-être déjà été effectuée ou nécessite une intervention." -ForegroundColor Yellow
}

# 2. Configuration d'Audacity (Hôte audio : Windows WASAPI)
Write-Host "2. Configuration automatique d'Audacity pour l'enregistrement de visioconférence (WASAPI)..." -ForegroundColor Yellow

$audacityAppData = Join-Path $env:APPDATA "audacity"
if (!(Test-Path $audacityAppData)) {
    New-Item -ItemType Directory -Path $audacityAppData -Force -ErrorAction SilentlyContinue | Out-Null
}

$cfgPath = Join-Path $audacityAppData "audacity.cfg"
$cfgContent = @"
[AudioIO]
Host=Windows WASAPI
"@

# Si le fichier de configuration existe déjà, on vérifie s'il contient déjà des données pour ne pas tout écraser
if (Test-Path $cfgPath) {
    $existing = Get-Content $cfgPath -Raw -ErrorAction SilentlyContinue
    if ($existing -notlike "*[AudioIO]*") {
        Add-Content -Path $cfgPath -Value "`r`n[AudioIO]`r`nHost=Windows WASAPI" -Encoding utf8
    } elseif ($existing -notlike "*Host=Windows WASAPI*") {
        # Si [AudioIO] existe mais pas Host=Windows WASAPI, on le remplace ou on l'ajoute
        $existing = $existing -replace "\[AudioIO\]", "[AudioIO]`r`nHost=Windows WASAPI"
        Set-Content -Path $cfgPath -Value $existing -Encoding utf8
    }
} else {
    Set-Content -Path $cfgPath -Value $cfgContent -Encoding utf8
}

Write-Host "   [SUCCÈS] Configuration appliquée : Windows WASAPI est maintenant l'hôte audio par défaut !" -ForegroundColor Green
Write-Host "   Note : Quand vous ouvrirez Audacity :" -ForegroundColor Cyan
Write-Host "   1. Cliquez sur 'Configuration audio' (Audio Setup) en haut." -ForegroundColor Cyan
Write-Host "   2. Vérifiez que l'hôte est bien 'Windows WASAPI'." -ForegroundColor Cyan
Write-Host "   3. Dans 'Périphérique d'enregistrement' (Recording Device), choisissez vos haut-parleurs ou votre casque suivi de (loopback)." -ForegroundColor Cyan
