# SPEC.md

## 1. TECHNOLOGY STACK

- **Backend**
  - Node.js v20.x
  - Express.js v4.18.x
  - TypeScript v5.x
  - PostgreSQL v15.x
  - Docker v24.x

- **Frontend**
  - React v18.x
  - TypeScript v5.x
  - Vite v4.x
  - Docker v24.x
  - Nginx v1.25.x

- **Infrastructure**
  - Docker Compose v2.x

---

## 2. DATA CONTRACTS

### Backend (TypeScript)

```typescript
// backend/src/models/Calculation.ts
export interface Calculation {
  id: number;
  expression: string;
  result: number;
  created_at: string; // ISO 8601 timestamp
}

export interface CalculationCreate {
  expression: string;
}
```

### Frontend (TypeScript)

```typescript
// frontend/src/types/calculation.ts
export interface Calculation {
  id: number;
  expression: string;
  result: number;
  created_at: string; // ISO 8601 timestamp
}

export interface CalculationCreate {
  expression: string;
}
```

---

## 3. API ENDPOINTS

### 1. Calculate Expression

- **Method:** POST
- **Path:** `/api/calculate`
- **Request Body:**

  ```json
  {
    "expression": "string" // e.g. "2+2", "5-3"
  }
  ```

  - **TypeScript:** `CalculationCreate`

- **Response:**

  ```json
  {
    "id": 1,
    "expression": "2+2",
    "result": 4,
    "created_at": "2024-06-01T12:00:00Z"
  }
  ```

  - **TypeScript:** `Calculation`

---

### 2. Get Calculation History

- **Method:** GET
- **Path:** `/api/history`
- **Request Body:** _None_
- **Response:**

  ```json
  [
    {
      "id": 1,
      "expression": "2+2",
      "result": 4,
      "created_at": "2024-06-01T12:00:00Z"
    },
    {
      "id": 2,
      "expression": "5-3",
      "result": 2,
      "created_at": "2024-06-01T12:01:00Z"
    }
  ]
  ```

  - **TypeScript:** `Calculation[]`

---

## 4. FILE STRUCTURE

```
.
├── backend/
│   ├── Dockerfile                # Docker build for backend service
│   ├── package.json              # Node.js dependencies and scripts
│   ├── tsconfig.json             # TypeScript configuration
│   ├── src/
│   │   ├── app.ts                # Express app entry point
│   │   ├── server.ts             # HTTP server bootstrap (reads PORT)
│   │   ├── routes/
│   │   │   ├── calculate.ts      # /api/calculate endpoint handler
│   │   │   └── history.ts        # /api/history endpoint handler
│   │   ├── controllers/
│   │   │   ├── calculateController.ts # Business logic for calculation
│   │   │   └── historyController.ts   # Business logic for history
│   │   ├── models/
│   │   │   └── Calculation.ts    # Calculation interfaces
│   │   ├── db/
│   │   │   ├── index.ts          # PostgreSQL connection pool
│   │   │   └── migration.sql     # Table schema for calculations
│   │   └── utils/
│   │       └── evaluate.ts       # Expression parser/evaluator
│   └── .env.example              # Backend environment variables template
├── frontend/
│   ├── Dockerfile                # Docker build for frontend (React) app
│   ├── package.json              # React dependencies and scripts
│   ├── tsconfig.json             # TypeScript configuration
│   ├── vite.config.ts            # Vite configuration
│   ├── public/
│   │   └── index.html            # HTML entry point
│   └── src/
│       ├── main.tsx              # React app entry point
│       ├── App.tsx               # Main App component
│       ├── components/
│       │   ├── Calculator.tsx    # Calculator UI component
│       │   ├── History.tsx       # Calculation history list
│       │   └── Display.tsx       # Display for current input/result
│       ├── hooks/
│       │   └── useCalculator.ts  # State and API logic for calculator
│       ├── types/
│       │   └── calculation.ts    # Calculation interfaces (mirrors backend)
│       └── styles/
│           └── main.css          # App styles
│   └── .env.example              # Frontend environment variables template
├── nginx/
│   └── nginx.conf                # Nginx reverse proxy configuration
├── docker-compose.yml            # Multi-service orchestration
├── start.sh                      # Startup script for local/dev
├── .gitignore                    # Git ignore rules
├── README.md                     # Project documentation
```

### PORT TABLE

| Service   | Listening Port | Path           |
|-----------|---------------|----------------|
| backend   | 4000          | backend/       |
| frontend  | 3000          | frontend/      |

### SHARED MODULES

_None. No shared code directory between backend and frontend._

---

## 5. ENVIRONMENT VARIABLES

### Backend (`backend/.env.example`)

| Name             | Type   | Description                                 | Example Value         |
|------------------|--------|---------------------------------------------|----------------------|
| PORT             | number | Port for Express server                     | 4000                 |
| DATABASE_URL     | string | PostgreSQL connection string                | postgres://user:pass@db:5432/calcu |
| NODE_ENV         | string | Node environment (development/production)   | development          |

### Frontend (`frontend/.env.example`)

| Name             | Type   | Description                                 | Example Value        |
|------------------|--------|---------------------------------------------|---------------------|
| VITE_API_URL     | string | Base URL for backend API                    | http://localhost:4000/api |

---

## 6. IMPORT CONTRACTS

### Backend

- `from ./models/Calculation import Calculation, CalculationCreate`
- `from ./db/index import pool`
- `from ./utils/evaluate import evaluateExpression`
- `from ./controllers/calculateController import calculateHandler`
- `from ./controllers/historyController import historyHandler`
- `from ./routes/calculate import router as calculateRouter`
- `from ./routes/history import router as historyRouter`

### Frontend

- `import { Calculation, CalculationCreate } from './types/calculation'`
- `import { useCalculator } from './hooks/useCalculator'`
- `import Calculator from './components/Calculator'`
- `import History from './components/History'`
- `import Display from './components/Display'`

---

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### React Hook

```typescript
useCalculator() → {
  input: string;
  setInput: (value: string) => void;
  result: number | null;
  loading: boolean;
  error: string | null;
  history: Calculation[];
  calculate: () => Promise<void>;
  clear: () => void;
  fetchHistory: () => Promise<void>;
}
```

### Components

- **Calculator**  
  `props: { input: string; setInput: (value: string) => void; calculate: () => void; loading: boolean; error: string | null; }`

- **Display**  
  `props: { value: string | number; }`

- **History**  
  `props: { history: Calculation[]; }`

---

## 8. FILE EXTENSION CONVENTION

- **Frontend files:** `.tsx` (TypeScript React)
- **Backend files:** `.ts` (TypeScript)
- **Project language:** TypeScript throughout (no JavaScript files)
- **Entry point:** `/src/main.tsx` (as referenced in `public/index.html`)

---

**All code, interfaces, and state must use the field and property names exactly as specified above. All endpoints, file paths, and environment variables must match this specification verbatim.**