# Coverage Report — backend
Fecha: 2026-04-28  |  Stack: TypeScript/Express  |  Directorio: backend/

## Resumen
| Métrica | Valor |
|---------|-------|
| Estado | 🟢 BUENO |
| Cobertura total | 96.25% |
| Tests ejecutados | 19 |
| Tests pasados | 19 |
| Tests fallidos | 0 |

## Cobertura por archivo
| Archivo | Cobertura |
|---------|-----------|
| src/app.ts | 84.61% |
| src/controllers/calculateController.ts | 100% |
| src/controllers/historyController.ts | 100% |
| src/routes/calculate.ts | 100% |
| src/routes/history.ts | 100% |
| src/utils/evaluate.ts | 96.96% |

## Tests fallidos / errores
Ninguno

## Output completo
```
-------------------------------|---------|----------|---------|---------|-------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------|---------|----------|---------|---------|-------------------
All files                |   96.25 |    86.48 |   83.33 |   96.15 |
 src                     |   84.61 |      100 |      50 |   84.61 |
  app.ts                 |   84.61 |      100 |      50 |   84.61 | 17-18
 src/controllers         |     100 |       75 |     100 |     100 |
  calculateController.ts |     100 |    83.33 |     100 |     100 | 27
  historyController.ts   |     100 |       50 |     100 |     100 | 18
 src/routes              |     100 |      100 |     100 |     100 |
  calculate.ts           |     100 |      100 |     100 |     100 |
  history.ts             |     100 |      100 |     100 |     100 |
 src/utils               |   96.96 |    89.65 |     100 |   96.87 |
  evaluate.ts            |   96.96 |    89.65 |     100 |   96.87 | 42
-------------------------|---------|----------|---------|---------|-------------------
Test Suites: 2 passed, 2 total
Tests:       19 passed, 19 total
```