# Calcu v10

A full-stack calculator application with history persistence.

## Prerequisites

- Docker v24.x
- Docker Compose v2.x

## Quick Start

```bash
./start.sh
```

Access the application at: http://localhost:3000

## Architecture

- **Frontend**: React 18 + TypeScript + Vite (port 3000)
- **Backend**: Node.js 20 + Express.js + TypeScript (port 4000)
- **Database**: PostgreSQL 15
- **Reverse Proxy**: Nginx

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/calculate | Evaluate an expression |
| GET | /api/history | Get calculation history |
| GET | /health | Health check |

## Environment Variables

See `.env.example` for configuration options.