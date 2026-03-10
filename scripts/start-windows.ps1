$ErrorActionPreference = "Stop"
Set-Location "$PSScriptRoot\.."
docker rm -f prelegal 2>$null
docker build -t prelegal .
docker run -d --name prelegal --env-file .env -p 8000:8000 prelegal
Write-Host "Prelegal running at http://localhost:8000"
