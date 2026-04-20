# Prompts de Ingeniería — cart-manager-api

Colección de prompts estructurados utilizados durante el desarrollo del backend `cart-manager-api`,
siguiendo los principios de **Prompt Engineering** del CoE ITAC:

1. Comentarios claros y descriptivos
2. Pasos secuenciales
3. Contexto específico del framework/tecnología
4. Ejemplos de entrada/salida cuando aplica
5. Restricciones explícitas

---

## PROMPT 1 — Inicialización del proyecto

**Branch:** `feature/API-1/project-init`

```
// Context: Backend REST API with ExpressJS + TypeScript, hexagonal architecture, Node 22.x
// Task: Initialize project structure with tsconfig, package.json scripts, and .gitignore
// Step 1: Configure tsconfig.json with strict TypeScript settings, outDir=dist, rootDir=src
// Step 2: Add npm scripts: build, start, dev (nodemon), test (jest), lint
// Step 3: Create .gitignore excluding node_modules, dist, coverage, .env
// Step 4: Create full hexagonal folder structure:
//   src/application/dto, src/application/use-cases
//   src/domain/entities, enums, exceptions, repositories, types
//   src/infrastructure/__mocks__, adapters, controllers, helpers, middlewares, services
// Constraints: CommonJS modules (not ESM); Node 22.x minimum; strict TypeScript
// Expected output: `npm run build` compiles without errors
```

**Archivos generados:** `package.json`, `tsconfig.json`, `jest.config.js`, `.gitignore`, `.env.example`

---

## PROMPT 2 — ESLint + Prettier

**Branch:** `feature/API-2/eslint-prettier`

```
// Context: ExpressJS + TypeScript backend, Node 22.x, CommonJS modules
// Task: Configure ESLint flat config and Prettier for TypeScript backend code
// Step 1: Create eslint.config.js with TypeScript rules, no-console warning, no-any warning
// Step 2: Create .prettierrc with singleQuote, trailingComma es5, printWidth 100, endOfLine auto
// Step 3: Create .prettierignore excluding dist, node_modules, coverage, package-lock.json
// Constraints: ESLint v10 flat config format; compatible with CommonJS (no "type":"module")
// Expected output: `npm run lint` passes on src/
```

**Archivos generados:** `eslint.config.js`, `.prettierrc`, `.prettierignore`

---

## PROMPT 3 — CommitLint + lefthook

**Branch:** `feature/API-3/commitlint-lefthook`

```
// Context: ExpressJS backend, gitflow, Smart Commits format ITAC CoE
// Task: Configure commitlint + lefthook hooks for commit-msg and pre-commit validation
// Smart Commits format: "type((API-NNN) - HU(API-NNN)): description"
// Step 1: Create commitlint.config.cjs reading PROJECT_JIRA from .env
// Step 2: Create lefthook.yml with commit-msg (commitlint), pre-commit (eslint + prettier),
//         and pre-push (unit tests with 90% coverage - ITAC CoE requirement)
// Step 3: Run lefthook install to activate hooks
// Constraints: CJS format (.cjs); scope regex must match (API-NNN) - HU(API-NNN)
//   Template literal escaping: use \\( not \( for regex parentheses
// Expected output: invalid commits rejected; valid Smart Commits pass
```

**Archivos generados:** `commitlint.config.cjs`, `lefthook.yml`

---

## PROMPT 4 — Variables de entorno

**Branch:** Incluido en inicialización (API-1)

```
// Context: ExpressJS backend with lefthook + commitlint requiring PROJECT_JIRA
// Task: Add .env and .env.example files for environment configuration
// Step 1: Create .env with PROJECT_JIRA=API and PORT=3000
// Step 2: Create .env.example as a safe public template
// Step 3: Ensure .env is in .gitignore; .env.example is committed
// Constraints: Never commit real secrets; template must document all required vars
// Expected output: .env ignored by git, .env.example tracked
```

**Archivos generados:** `.env` (ignorado), `.env.example`

---

## PROMPT 5 — Capa Domain

**Branch:** `feature/API-5/domain-layer`

```
// Context: Hexagonal architecture backend - Domain layer (innermost, no external dependencies)
// Task: Define Product domain - entity, enum, exception, repository interface
// Step 1: Create Product entity with id, name, description, price, stock, category, timestamps
// Step 2: Create ProductCategory enum with Electronics, Accessories, Clothing, Food, Other
// Step 3: Create ProductNotFoundException for domain-level not-found error
// Step 4: Create IProductRepository interface defining CRUD contract (findAll, findById, save, update, delete)
// Step 5: Add barrel index.ts for each domain subfolder
// Constraints: Domain must have ZERO imports from application or infrastructure layers
// Expected output: src/domain/ compiles cleanly; no external dependencies
```

**Archivos generados:**
- `src/domain/entities/product.entity.ts` + `index.ts`
- `src/domain/enums/product-category.enum.ts` + `index.ts`
- `src/domain/exceptions/product-not-found.exception.ts` + `index.ts`
- `src/domain/repositories/product.repository.ts` + `index.ts`
- `src/domain/index.ts`

---

## PROMPT 6 — Capa Application (DTOs + Use Cases)

**Branch:** `feature/API-6/application-layer`

```
// Context: Hexagonal architecture - Application layer (orchestrates domain, no HTTP/DB knowledge)
// Task: Create DTOs and use cases for Product CRUD
// Step 1: Create CreateProductDto and UpdateProductDto with validation fields
// Step 2: Create GetProductsUseCase - returns all products via IProductRepository
// Step 3: Create GetProductByIdUseCase - finds by id, throws ProductNotFoundException if missing
// Step 4: Create CreateProductUseCase - generates uuid, sets timestamps, calls repository.save
// Step 5: Create UpdateProductUseCase - validates exists, merges fields, calls repository.update
// Step 6: Create DeleteProductUseCase - validates exists, calls repository.delete
// Step 7: Add barrel index.ts for dto/ and use-cases/
// Constraints: Use cases receive IProductRepository via constructor injection (DI)
//   No imports from infrastructure layer; use crypto.randomUUID() for id generation
// Expected output: tsc --noEmit passes cleanly
```

**Archivos generados:**
- `src/application/dto/create-product.dto.ts`, `update-product.dto.ts`, `index.ts`
- `src/application/use-cases/` — 5 use cases + `index.ts`
- `src/application/index.ts`

---

## PROMPT 7 — Capa Infrastructure (Adapter + Controller + Middleware + Routes)

**Branch:** `feature/API-7/infrastructure-layer`

```
// Context: Hexagonal architecture - Infrastructure layer (outermost, implements ports)
// Task: Implement in-memory adapter, Express controllers, error middleware and routes
// Step 1: Create InMemoryProductRepository implementing IProductRepository with seed data
// Step 2: Create ProductController with handlers: getAll, getById, create, update, delete
// Step 3: Create error-handler middleware mapping ProductNotFoundException → 404, others → 500
// Step 4: Create product.routes.ts wiring Express Router to ProductController methods
// Step 5: Add barrel index.ts for each infrastructure subfolder
// Constraints: Controllers only call use cases; no domain/business logic in controllers
//   Adapter only handles data persistence; ProductController receives use cases via constructor
//   Express 5.x: req.params.id is string | string[] - cast with String()
// Expected output: tsc --noEmit passes; routes defined for GET/POST/PUT/DELETE /api/products
```

**Archivos generados:**
- `src/infrastructure/adapters/in-memory-product.repository.ts` + `index.ts`
- `src/infrastructure/controllers/product.controller.ts` + `index.ts`
- `src/infrastructure/middlewares/error-handler.middleware.ts` + `index.ts`
- `src/infrastructure/services/product.routes.ts` + `index.ts`
- `src/infrastructure/index.ts`

---

## PROMPT 8 — Express App Bootstrap (main.ts)

**Branch:** `feature/API-8/app-bootstrap`

```
// Context: ExpressJS + TypeScript backend, hexagonal architecture
// Task: Create main.ts as the Express application entry point
// Step 1: Initialize Express app with JSON body parser
// Step 2: Mount productRouter at /api/products
// Step 3: Add health-check endpoint GET /health → { status: 'ok' }
// Step 4: Register errorHandler middleware as last middleware
// Step 5: Read PORT from process.env, default to 3000, start server
// Constraints: main.ts must not import from domain or application directly
//   All wiring happens through infrastructure/services (routes)
// Expected output: `npm run build` compiles; server starts on PORT
```

**Archivos generados:** `src/main.ts`

---

## PROMPT 9 — Unit Tests Jest (90% cobertura mínima CoE)

**Branch:** `feature/API-9/unit-tests`

```
// Context: ExpressJS + TypeScript backend, Jest + ts-jest, ITAC CoE requires 90% coverage
// Task: Write unit tests for use cases, repository, controller, and middleware
// Step 1: Test all 5 use cases with mocked IProductRepository (jest.fn())
//   - Happy path and error path (ProductNotFoundException) for each
// Step 2: Test InMemoryProductRepository - all 5 methods with real in-memory state
//   - findAll, findById (found/not found), save, update, delete (existing/non-existent)
// Step 3: Test ProductController - mock use cases, test all HTTP handlers + error paths
// Step 4: Test error-handler middleware - ProductNotFoundException → 404, generic → 500
// Step 5: Test ProductNotFoundException - message format and inheritance
// Step 6: Remove --passWithNoTests from test:ci; create tsconfig.spec.json with jest types
// Constraints: Use jest.fn() mocks; no HTTP calls; no Express in unit tests
//   Exclude barrel index.ts, enum files, routes wiring from coverage
//   coverageThreshold 90% must pass; ts-jest config via transform (not deprecated globals)
// Expected output: 30/30 tests pass; 100% coverage on all measured files
```

**Archivos generados:** 9 archivos `.spec.ts` + `tsconfig.spec.json`
**Resultado:** 30 tests, 100% cobertura (statements, branches, functions, lines)

---

## PROMPT 10 — GitHub Actions Workflows + CODEOWNERS

**Branch:** `feature/API-10/github-workflows`

```
// Context: ExpressJS backend, gitflow integration/laboratory/main branches
// Task: Add GitHub Actions workflows and CODEOWNERS following ITAC CoE standards
// Step 1: CODEOWNERS assigning reviewers - minimum 2 approvals per merge
// Step 2: requirements.yml - lint on PRs to integration (Node 22.x)
// Step 3: integration.yml - unit tests + coverage on push to integration
// Step 4: laboratory.yml - build validation on push to laboratory
// Step 5: production.yml - tests + build + semantic version tag validation on push to main
// Constraints: pre-push hook enforces tests locally; CI is the remote safety net
// Expected output: .github/ with 4 workflows + CODEOWNERS
```

**Archivos generados:**
- `.github/CODEOWNERS`
- `.github/workflows/requirements.yml`
- `.github/workflows/integration.yml`
- `.github/workflows/laboratory.yml`
- `.github/workflows/production.yml`

---

## Resumen de ramas creadas

| Branch | Ticket | Descripción |
|--------|--------|-------------|
| `feature/API-2/eslint-prettier` | API-2 | ESLint flat config + Prettier |
| `feature/API-3/commitlint-lefthook` | API-3 | CommitLint + lefthook (3 hooks) |
| `feature/API-5/domain-layer` | API-5 | Domain layer hexagonal |
| `feature/API-6/application-layer` | API-6 | DTOs + 5 use cases |
| `feature/API-7/infrastructure-layer` | API-7 | Adapter + Controller + Middleware + Routes |
| `feature/API-8/app-bootstrap` | API-8 | Express main.ts |
| `feature/API-9/unit-tests` | API-9 | 30 tests — 100% coverage |
| `feature/API-10/github-workflows` | API-10 | GitHub Actions + CODEOWNERS |

## Stack

- **Runtime**: Node.js 22.x
- **Framework**: ExpressJS 5.x + TypeScript
- **Arquitectura**: Hexagonal (Domain → Application → Infrastructure)
- **Tests**: Jest + ts-jest — 100% cobertura
- **Hooks**: lefthook (commit-msg, pre-commit, pre-push)
- **CI/CD**: GitHub Actions (4 workflows)
