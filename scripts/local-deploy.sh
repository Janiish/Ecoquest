#!/bin/bash

# Local deployment script for EcoQuest
# Usage: ./scripts/local-deploy.sh

set -e

echo "🚀 EcoQuest Local Deployment"
echo "=============================="

# Detect container engine (Podman or Docker)
if command -v podman &> /dev/null; then
  CONTAINER_ENGINE="podman"
  if command -v podman-compose &> /dev/null; then
    COMPOSE_CMD="podman-compose"
  else
    COMPOSE_CMD="podman compose"
  fi
  echo "✓ Using Podman"
elif command -v docker &> /dev/null; then
  CONTAINER_ENGINE="docker"
  if command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
  else
    COMPOSE_CMD="docker compose"
  fi
  echo "✓ Using Docker"
else
  echo "❌ Neither Podman nor Docker found!"
  echo ""
  echo "Please install one of the following:"
  echo "  Podman: https://podman.io/getting-started/installation"
  echo "  Docker: https://www.docker.com/products/docker-desktop"
  exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
  echo "⚠️  .env file not found. Creating from .env.example..."
  cp .env.example .env
  echo "⚠️  Please edit .env with your credentials before continuing."
  exit 1
fi

# Load environment variables
source .env

# Build container images
echo ""
echo "📦 Building container images..."
$COMPOSE_CMD build --no-cache

# Start services
echo ""
echo "🔄 Starting services..."
$COMPOSE_CMD up -d

# Wait for services to be healthy
echo ""
echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check service health
echo ""
echo "🔍 Checking service health..."

MAX_RETRIES=30
RETRY_COUNT=0

check_service() {
  SERVICE_NAME=$1
  HEALTH_URL=$2
  
  echo -n "Checking $SERVICE_NAME... "
  
  until [ $RETRY_COUNT -ge $MAX_RETRIES ]; do
    if curl -f -s -o /dev/null "$HEALTH_URL"; then
      echo "✅ Healthy"
      return 0
    fi
    
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo -n "."
    sleep 2
  done
  
  echo "❌ Failed"
  return 1
}

# Check MongoDB
if $CONTAINER_ENGINE exec ecoquest-mongo mongosh --eval "db.runCommand('ping')" > /dev/null 2>&1; then
  echo "MongoDB... ✅ Healthy"
else
  echo "MongoDB... ❌ Failed"
fi

# Check Redis
if $CONTAINER_ENGINE exec ecoquest-redis redis-cli -a "$REDIS_PASSWORD" PING > /dev/null 2>&1; then
  echo "Redis... ✅ Healthy"
else
  echo "Redis... ❌ Failed"
fi

# Reset retry counter
RETRY_COUNT=0

# Check Backend
check_service "Backend" "http://localhost:3000/api/health"

# Check Frontend
check_service "Frontend" "http://localhost:80/"

# Print service status
echo ""
echo "📊 Service Status:"
$COMPOSE_CMD ps

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Access your services:"
echo "   Frontend:  http://localhost"
echo "   Backend:   http://localhost:3000"
echo "   MongoDB:   mongodb://localhost:27017"
echo "   Redis:     redis://localhost:6379"
echo ""
echo "📝 Useful commands:"
echo "   View logs:        $COMPOSE_CMD logs -f"
echo "   Stop services:    $COMPOSE_CMD down"
echo "   Restart service:  $COMPOSE_CMD restart <service>"
echo "   Shell access:     $CONTAINER_ENGINE exec -it ecoquest-backend sh"
echo ""
echo "🧪 Test endpoints:"
echo "   curl http://localhost:3000/api/health"
echo "   curl http://localhost:3000/api/version"
echo "   curl http://localhost/"
