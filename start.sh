#!/bin/bash

set -e

echo "Starting Calcu v10..."

if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed"
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "Error: Docker Compose is not installed"
    exit 1
fi

COMPOSE_CMD="docker-compose"
if ! command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker compose"
fi

echo "Building and starting services..."
$COMPOSE_CMD up --build -d

echo "Waiting for services to be healthy..."
sleep 10

echo ""
echo "========================================"
echo "  Calcu v10 is running!"
echo "========================================"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:4000"
echo "  Health:    http://localhost:4000/health"
echo "========================================"
echo ""

$COMPOSE_CMD ps