# Local deployment script for EcoQuest (PowerShell)
# Usage: .\scripts\local-deploy.ps1

$ErrorActionPreference = "Stop"

Write-Host "🚀 EcoQuest Local Deployment" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan

# Detect container engine (Podman or Docker)
$CONTAINER_ENGINE = $null
$COMPOSE_CMD = $null

if (Get-Command podman -ErrorAction SilentlyContinue) {
    $CONTAINER_ENGINE = "podman"
    if (Get-Command podman-compose -ErrorAction SilentlyContinue) {
        $COMPOSE_CMD = "podman-compose"
    } else {
        $COMPOSE_CMD = "podman compose"
    }
    Write-Host "✓ Using Podman" -ForegroundColor Green
} elseif (Get-Command docker -ErrorAction SilentlyContinue) {
    $CONTAINER_ENGINE = "docker"
    if (Get-Command docker-compose -ErrorAction SilentlyContinue) {
        $COMPOSE_CMD = "docker-compose"
    } else {
        $COMPOSE_CMD = "docker compose"
    }
    Write-Host "✓ Using Docker" -ForegroundColor Green
} else {
    Write-Host "❌ Neither Podman nor Docker found!" -ForegroundColor Red
    Write-Host "" 
    Write-Host "Please install one of the following:" -ForegroundColor Yellow
    Write-Host "  Podman: https://podman.io/getting-started/installation" -ForegroundColor Cyan
    Write-Host "  Docker: https://www.docker.com/products/docker-desktop" -ForegroundColor Cyan
    exit 1
}

# Check if .env file exists
if (-Not (Test-Path .env)) {
    Write-Host "⚠️  .env file not found. Creating from .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "⚠️  Please edit .env with your credentials before continuing." -ForegroundColor Yellow
    exit 1
}

# Build container images
Write-Host ""
Write-Host "📦 Building container images..." -ForegroundColor Cyan
& $COMPOSE_CMD build --no-cache

# Start services
Write-Host ""
Write-Host "🔄 Starting services..." -ForegroundColor Cyan
& $COMPOSE_CMD up -d

# Wait for services to be healthy
Write-Host ""
Write-Host "⏳ Waiting for services to be healthy..." -ForegroundColor Cyan
Start-Sleep -Seconds 10

# Check service health
Write-Host ""
Write-Host "🔍 Checking service health..." -ForegroundColor Cyan

function Test-ServiceHealth {
    param(
        [string]$ServiceName,
        [string]$HealthUrl,
        [int]$MaxRetries = 30
    )
    
    Write-Host -NoNewline "Checking $ServiceName... "
    
    for ($i = 0; $i -lt $MaxRetries; $i++) {
        try {
            $response = Invoke-WebRequest -Uri $HealthUrl -TimeoutSec 2 -UseBasicParsing -ErrorAction Stop
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ Healthy" -ForegroundColor Green
                return $true
            }
        }
        catch {
            Write-Host -NoNewline "."
            Start-Sleep -Seconds 2
        }
    }
    
    Write-Host "❌ Failed" -ForegroundColor Red
    return $false
}

# Check MongoDB
try {
    & $CONTAINER_ENGINE exec ecoquest-mongo mongosh --eval "db.runCommand('ping')" | Out-Null
    Write-Host "MongoDB... ✅ Healthy" -ForegroundColor Green
}
catch {
    Write-Host "MongoDB... ❌ Failed" -ForegroundColor Red
}

# Check Redis
try {
    & $CONTAINER_ENGINE exec ecoquest-redis redis-cli PING | Out-Null
    Write-Host "Redis... ✅ Healthy" -ForegroundColor Green
}
catch {
    Write-Host "Redis... ❌ Failed" -ForegroundColor Red
}

# Check Backend
Test-ServiceHealth -ServiceName "Backend" -HealthUrl "http://localhost:3000/api/health"

# Check Frontend
Test-ServiceHealth -ServiceName "Frontend" -HealthUrl "http://localhost:80/"

# Print service status
Write-Host ""
Write-Host "📊 Service Status:" -ForegroundColor Cyan
& $COMPOSE_CMD ps

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Access your services:" -ForegroundColor Cyan
Write-Host "   Frontend:  http://localhost"
Write-Host "   Backend:   http://localhost:3000"
Write-Host "   MongoDB:   mongodb://localhost:27017"
Write-Host "   Redis:     redis://localhost:6379"
Write-Host ""
Write-Host "📝 Useful commands:" -ForegroundColor Cyan
Write-Host "   View logs:        $COMPOSE_CMD logs -f"
Write-Host "   Stop services:    $COMPOSE_CMD down"
Write-Host "   Restart service:  $COMPOSE_CMD restart <service>"
Write-Host "   Shell access:     $CONTAINER_ENGINE exec -it ecoquest-backend sh"
Write-Host ""
Write-Host "🧪 Test endpoints:" -ForegroundColor Cyan
Write-Host "   curl http://localhost:3000/api/health"
Write-Host "   curl http://localhost:3000/api/version"
Write-Host "   curl http://localhost/"
