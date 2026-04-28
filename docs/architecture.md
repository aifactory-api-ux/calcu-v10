# Architecture

## System Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│    Nginx    │────▶│  Frontend   │
│  (Browser)  │     │  (Proxy)    │     │  (React)    │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Backend   │
                    │  (Express)  │
                    └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │    Postgres │
                    │   (Database)│
                    └─────────────┘
```

## Components

### Frontend (React)
- Serves the calculator UI
- Communicates with backend via REST API
- Managed state with useCalculator hook

### Backend (Express)
- Handles calculation requests
- Manages database connections
- Exposes REST API endpoints

### Database (PostgreSQL)
- Stores calculation history
- Tables: calculations

## Ports

| Service | Port |
|---------|------|
| Frontend | 3000 |
| Backend | 4000 |
| Database | 5432 |