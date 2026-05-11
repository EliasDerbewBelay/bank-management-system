# 🏦 Advanced Bank Management System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)
![PostgreSQL](https://img.shields.io/badge/postgresql-16-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)
![Status](https://img.shields.io/badge/status-in%20development-orange)

**A comprehensive, secure, and scalable relational database-backed banking platform built for modern financial institutions.**

[Features](#features) · [Architecture](#architecture) · [Tech Stack](#tech-stack) · [Getting Started](#getting-started) · [Database Design](#database-design) · [API Reference](#api-reference) · [Contributing](#contributing)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Design](#database-design)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Portal Roles](#portal-roles)
- [API Reference](#api-reference)
- [Security](#security)
- [Testing](#testing)
- [Deployment](#deployment)
- [Team](#team)
- [License](#license)

---

## Overview

The **Advanced Bank Management System** is a full-stack, enterprise-grade banking platform developed as a Database Systems course project at **Addis Ababa Science and Technology University (AASTU)**, Department of Electrical and Computer Engineering.

The system is built on a fully normalized relational database (BCNF) and provides three distinct portal interfaces — **Customer**, **Bank Staff/Teller**, and **Admin/Manager** — each tailored to its users' workflows. It supports multi-branch operations, multi-currency accounts, complete loan lifecycle management, digital banking, ATM network monitoring, real-time audit logging, and more.

> **Course:** Database Systems — ECEg4410
> **Submitted to:** Asamnew G.

---

## Features

### Core Banking
- **Multi-branch hierarchy** — centralized bank entity with regional branches, departments, and employee management
- **Multi-currency accounts** — ETB, USD, EUR and more with live exchange rate management
- **Account types** — Savings, Checking, Fixed Deposit, and Recurring Deposit with dynamic interest rate configuration
- **Joint & corporate accounts** — full many-to-many ownership via junction table with ownership percentage
- **Transaction processing** — Deposit, Withdrawal, Internal Transfer, Inter-bank (SWIFT), Card Payment, Utility Payment, FX transactions
- **Transaction reversal** — full refund workflow with approval routing and linked debit entry tracking
- **Interest accrual** — automated periodic interest calculation and posting per account type
- **Standing orders** — recurring transfers scheduled against beneficiaries

### Loan Management
- **Full loan lifecycle** — Application → Review → Approval → Disbursement → Repayment → Closure
- **Loan types** — Personal, Home, Auto, Corporate, Education
- **Collateral management** — multiple collaterals per loan with revaluation history
- **Guarantor tracking** — full guarantor records linked to loans and customers
- **Repayment scheduling** — principal + interest split per installment, partial payment tracking, overdue detection

### Digital Banking & Security
- **Three-portal system** — Customer, Staff, and Admin portals with role-based access control
- **Two-factor authentication** — TOTP-based (Google Authenticator compatible)
- **Session management** — short-lived JWT access tokens + rotating refresh tokens, multi-device session tracking
- **Password security** — Argon2id hashing with salting, password history enforcement, forced change on first login
- **Audit logging** — every critical action logged with user, timestamp, IP address, old/new values, and suspicious flag
- **Account locking** — automatic lockout after configurable failed login attempts

### Operations
- **ATM network management** — real-time status, cash balance monitoring, refill logging
- **Card management** — Debit/Credit card issuance, freeze/unfreeze, daily/monthly limits, PIN management
- **Utility payments** — Electricity, Water, Telecom, Tax with provider reference tracking
- **Beneficiary management** — saved beneficiaries with verification status
- **Notification system** — SMS, email, and in-app push notifications per action
- **Reporting** — transaction summaries, loan aging, KYC status, ATM performance — exportable as PDF and XLSX
- **Charge schedules** — configurable fee rules (flat/percentage, min/max caps) per transaction type

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          Client Layer                           │
│         Customer Portal │ Staff Portal │ Admin Portal           │
│                    (Next.js 14 — App Router)                    │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS / WSS
┌────────────────────────────▼────────────────────────────────────┐
│                       Nginx (Reverse Proxy)                     │
│               TLS Termination · Rate Limiting · Caching         │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    API Layer (Node.js + Express)                 │
│  Auth Service │ Accounts │ Transactions │ Loans │ Admin │ ...   │
│                    RBAC Middleware · Helmet.js                   │
└──────┬──────────────────────────────────────────┬───────────────┘
       │                                          │
┌──────▼──────┐   ┌─────────────┐   ┌────────────▼───────────────┐
│  PostgreSQL │   │    Redis     │   │       BullMQ Workers        │
│  (Primary)  │   │  Sessions   │   │  Interest · Standing Orders │
│  PgBouncer  │   │  OTP Cache  │   │  Notifications · Reports    │
│  Timescale  │   │  Rate Limit │   │  Exchange Rates · Accruals  │
└─────────────┘   └─────────────┘   └────────────────────────────┘
       │
┌──────▼──────┐
│   AWS S3 /  │
│    MinIO    │
│  Documents  │
│  KYC Files  │
│  Statements │
└─────────────┘
```

The system follows a **monorepo structure** with shared TypeScript types and Zod validation schemas used across both frontend and backend to ensure a single source of truth for all data contracts.

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14.x | React framework with App Router and SSR |
| TypeScript | 5.x | Type safety across the entire frontend |
| Tailwind CSS | 3.x | Utility-first styling with design tokens |
| shadcn/ui | latest | Accessible Radix UI-based component library |
| Recharts | 2.x | Transaction charts, portfolio visualizations |
| TanStack Query | 5.x | Server state, caching, background refetch |
| TanStack Table | 8.x | Headless table engine for large data sets |
| Zod | 3.x | Shared runtime schema validation |
| React Hook Form | 7.x | Form state management and validation integration |
| Zustand | 4.x | Client state (session, sidebar, notifications) |
| Socket.io Client | 4.x | Real-time balance and notification updates |
| next-intl | 3.x | Internationalization (English / Amharic) |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20.x LTS | JavaScript runtime |
| Express | 4.x | HTTP framework |
| TypeScript | 5.x | Type safety, shared DTOs with frontend |
| Prisma | 5.x | Type-safe ORM and migration system |
| Socket.io | 4.x | WebSocket server for real-time push |
| BullMQ | 4.x | Redis-backed job queue for async processing |
| node-cron | 3.x | Scheduled jobs (accrual, overdue checks) |
| PDFKit | 0.14.x | Server-side PDF generation |
| ExcelJS | 4.x | XLSX export for reports |
| Joi / Zod | 3.x | Request body validation middleware |

### Database & Storage
| Technology | Purpose |
|---|---|
| PostgreSQL 16 | Primary relational database (ACID, row-level locking) |
| TimescaleDB | Time-series extension for transaction and audit log hypertables |
| PgBouncer | Connection pooler for production PostgreSQL |
| Redis 7 | Sessions, OTP cache, rate limit store, BullMQ backend |
| AWS S3 / MinIO | Document storage — KYC files, collateral docs, statements |

### Security
| Technology | Purpose |
|---|---|
| Argon2id | Password hashing (memory-hard, GPU-resistant) |
| JWT + Refresh Tokens | Short-lived access (15 min) + rotating refresh (7 days) |
| otplib | TOTP-based two-factor authentication |
| Helmet.js | HTTP security headers (HSTS, CSP, X-Frame-Options, etc.) |
| express-rate-limit | Per-route rate limiting backed by Redis |
| TLS 1.3 | All traffic encrypted in transit |

### Infrastructure & DevOps
| Technology | Purpose |
|---|---|
| Docker + Docker Compose | Containerization and local development orchestration |
| Kubernetes | Production container orchestration and auto-scaling |
| Nginx | Reverse proxy, TLS termination, static asset serving |
| GitHub Actions | CI/CD pipeline (lint → test → build → deploy) |
| PM2 | Node.js process manager for non-Kubernetes deployments |
| Prometheus + Grafana | Metrics collection and operational dashboards |
| Sentry | Error tracking and performance monitoring |

### Testing
| Technology | Purpose |
|---|---|
| Vitest | Unit and integration tests for business logic |
| Playwright | End-to-end browser testing for critical user journeys |
| Supertest | HTTP-level API integration tests |
| ESLint + Prettier | Code quality and formatting enforcement |
| Husky + lint-staged | Pre-commit hooks for automated quality gates |

---

## Project Structure

```
bank-management-system/
├── apps/
│   ├── web/                          # Next.js 14 frontend
│   │   ├── app/
│   │   │   ├── (customer)/           # Customer portal routes
│   │   │   ├── (staff)/              # Staff/teller portal routes
│   │   │   ├── (admin)/              # Admin portal routes
│   │   │   └── api/                  # Next.js API routes (BFF layer)
│   │   ├── components/
│   │   │   ├── ui/                   # shadcn/ui base components
│   │   │   ├── banking/              # Domain-specific components
│   │   │   └── layout/               # Nav, sidebar, shell components
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── lib/                      # Utilities, API client, formatters
│   │   ├── messages/                 # i18n translation files (en, am)
│   │   └── stores/                   # Zustand state stores
│   │
│   └── api/                          # Express backend
│       ├── src/
│       │   ├── routes/               # Route definitions per domain
│       │   │   ├── auth/
│       │   │   ├── accounts/
│       │   │   ├── transactions/
│       │   │   ├── loans/
│       │   │   ├── cards/
│       │   │   ├── customers/
│       │   │   ├── employees/
│       │   │   ├── atm/
│       │   │   ├── utility/
│       │   │   ├── admin/
│       │   │   └── reports/
│       │   ├── middleware/            # Auth, RBAC, rate limit, validate
│       │   ├── services/             # Business logic layer
│       │   ├── workers/              # BullMQ job processors
│       │   ├── jobs/                 # node-cron scheduled tasks
│       │   └── utils/                # Helpers, formatters, logger
│       └── prisma/
│           ├── schema.prisma         # Full database schema
│           ├── migrations/           # Auto-generated migration files
│           └── seed/                 # Development seed data
│
└── packages/
    └── shared/                       # Shared across apps/web and apps/api
        ├── schemas/                  # Zod validation schemas
        ├── types/                    # TypeScript interfaces and enums
        └── constants/                # Shared enums (roles, statuses, etc.)
```

---

## Database Design

The database is fully normalized to **Boyce-Codd Normal Form (BCNF)** and contains **25+ entities**. The ER model was designed using Chen notation.

### Core Entity Groups

**Bank & Branch**
`Bank` → `Branch` (self-referential hierarchy) → `Department` → `Employee` (self-referential manager chain)

**Customer & Accounts**
`Customer` ↔ `CustomerAccount` ↔ `Account` → `AccountType` · `Currency`
`Account` → `InterestAccrual` · `Transaction` → `TransactionFee`

**Loans**
`LoanApplication` → `Loan` → `Collateral` → `CollateralRevaluation`
`Loan` → `RepaymentSchedule` → `LoanPayment`
`Loan` → `Guarantor` ← `Customer`

**Digital & Security**
`Customer / Employee` → `OnlineUser` → `Session` · `PasswordHistory` · `Notification`
`Card` → `CardTransaction` · `AuditLog`

**Operations**
`ATM` → `ATMTransaction` · `Beneficiary` · `StandingOrder`
`UtilityPayment` · `Refund` · `ExchangeRate` · `ChargeSchedule`

### Key Design Decisions

- `DECIMAL(20, 6)` used for all monetary amounts — no floating-point precision loss
- `AvailableBalance` and `HoldAmount` maintained separately on `Account` for fund hold logic
- `ReversedByTransactionID` self-FK on `Transaction` enables full reversal chain tracing
- `TimescaleDB` hypertables on `Transaction` and `AuditLog` for fast time-range queries
- **Row-Level Security (RLS)** on PostgreSQL enforces that customers can only read their own data at the database level — not just at the application layer

---

## Getting Started

### Prerequisites

Ensure the following are installed on your machine:

- [Node.js](https://nodejs.org/) v20.x or higher
- [Docker](https://www.docker.com/) and Docker Compose v2
- [Git](https://git-scm.com/)
- [pnpm](https://pnpm.io/) v9.x (package manager)

```bash
npm install -g pnpm
```

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-org/bank-management-system.git
cd bank-management-system
```

**2. Install all dependencies**

```bash
pnpm install
```

**3. Start infrastructure services (PostgreSQL, Redis, MinIO)**

```bash
docker compose up -d postgres redis minio
```

**4. Run database migrations and seed development data**

```bash
cd apps/api
pnpm prisma migrate dev
pnpm prisma db seed
```

**5. Install TimescaleDB extension** (runs automatically via migration, or manually):

```bash
docker exec -it bms_postgres psql -U postgres -d bankdb -c "CREATE EXTENSION IF NOT EXISTS timescaledb;"
```

### Environment Variables

Create `.env` files in both `apps/api` and `apps/web` by copying the examples:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

**`apps/api/.env`**

```env
# Application
NODE_ENV=development
PORT=4000
API_URL=http://localhost:4000

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/bankdb
DIRECT_URL=postgresql://postgres:password@localhost:5432/bankdb

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_ACCESS_SECRET=your_super_secret_access_key_min_32_chars
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_32_chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Argon2 (password hashing)
ARGON2_MEMORY_COST=65536
ARGON2_TIME_COST=3
ARGON2_PARALLELISM=4

# TOTP (2FA)
TOTP_APP_NAME=BankMS

# File Storage (MinIO / S3)
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET_KYC=kyc-documents
S3_BUCKET_STATEMENTS=statements

# Email (SMTP)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@bankms.com
SMTP_PASS=your_smtp_password

# SMS (Twilio or local provider)
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_FROM_NUMBER=+1234567890

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_LOGIN_MAX=5
RATE_LIMIT_OTP_MAX=3
RATE_LIMIT_TRANSFER_MAX=20

# Sentry
SENTRY_DSN=https://your_sentry_dsn
```

**`apps/web/.env.local`**

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WS_URL=ws://localhost:4000
NEXT_PUBLIC_APP_NAME=BankMS
NEXT_PUBLIC_SENTRY_DSN=https://your_sentry_dsn
```

### Running the Application

**Development mode (all services in parallel):**

```bash
pnpm dev
```

This starts:
- Next.js frontend at `http://localhost:3000`
- Express API at `http://localhost:4000`
- BullMQ worker processes

**Run services individually:**

```bash
# Frontend only
pnpm --filter web dev

# Backend API only
pnpm --filter api dev

# Background workers only
pnpm --filter api workers
```

**Using Docker Compose (full stack):**

```bash
docker compose up --build
```

---

## Portal Roles

The system provides three distinct portals, each enforcing its own role-based access control at both the API middleware layer and the database (Row-Level Security).

| Role | Portal | Key Capabilities |
|---|---|---|
| `CUSTOMER` | Customer Portal | View own accounts, make transfers, pay bills, manage cards, view loans |
| `TELLER` | Staff Portal | Process deposits/withdrawals, search customers, initiate transfers, issue cards |
| `SUPERVISOR` | Staff Portal | All teller capabilities + approve refunds, override transaction limits |
| `BRANCH_MANAGER` | Staff Portal + Admin | Branch-level reports, staff management, loan approval authority |
| `ADMIN` | Admin Portal | Full system access, configuration, exchange rates, charge schedules, audit logs |

### Default Development Credentials (seed data)

| Role | Username | Password |
|---|---|---|
| Admin | `admin@bankms.com` | `Admin@1234!` |
| Branch Manager | `manager@bankms.com` | `Manager@1234!` |
| Teller | `teller@bankms.com` | `Teller@1234!` |
| Customer | `customer@bankms.com` | `Customer@1234!` |

> ⚠️ Change all seed credentials immediately in any non-development environment.

---

## API Reference

The API follows RESTful conventions. All endpoints require a valid `Authorization: Bearer <token>` header unless marked as public.

### Base URL

```
http://localhost:4000/api/v1
```

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/login` | Username + password login |
| `POST` | `/auth/verify-otp` | TOTP 2FA verification |
| `POST` | `/auth/refresh` | Refresh access token |
| `POST` | `/auth/logout` | Invalidate session |
| `POST` | `/auth/change-password` | Authenticated password change |

### Accounts

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/accounts` | List current user's accounts |
| `GET` | `/accounts/:id` | Account detail with balance |
| `GET` | `/accounts/:id/transactions` | Paginated transaction history |
| `GET` | `/accounts/:id/accruals` | Interest accrual history |
| `POST` | `/accounts` | Open new account (Staff+) |

### Transactions

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/transactions/deposit` | Cash deposit (Staff+) |
| `POST` | `/transactions/withdraw` | Cash withdrawal (Staff+) |
| `POST` | `/transactions/transfer` | Internal or inter-bank transfer |
| `POST` | `/transactions/fx` | Foreign exchange conversion |
| `GET` | `/transactions/:id` | Transaction detail + fees |
| `POST` | `/transactions/:id/reverse` | Initiate reversal (Supervisor+) |

### Loans

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/loans/applications` | Submit loan application |
| `GET` | `/loans/applications/:id` | Application status |
| `PATCH` | `/loans/applications/:id/review` | Approve / reject (Manager+) |
| `GET` | `/loans` | Active loans for current customer |
| `GET` | `/loans/:id/schedule` | Full repayment schedule |
| `POST` | `/loans/:id/pay` | Make a loan payment |

### Cards

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/cards` | List user's cards |
| `PATCH` | `/cards/:id/freeze` | Freeze / unfreeze card |
| `PATCH` | `/cards/:id/limits` | Update daily/monthly limit |
| `POST` | `/cards/:id/report-lost` | Block card and flag as lost |

### Admin

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/admin/audit-logs` | Paginated audit log with filters |
| `GET` | `/admin/reports/:type` | Generate report (PDF/XLSX) |
| `PUT` | `/admin/exchange-rates` | Update exchange rate |
| `POST` | `/admin/charge-schedules` | Create fee rule |
| `GET` | `/admin/employees` | Employee roster with branch filter |

> Full OpenAPI (Swagger) documentation is available at `http://localhost:4000/api/docs` when running in development mode.

---

## Security

This system is designed with a defense-in-depth approach across multiple layers:

### Password Security
- Passwords are hashed using **Argon2id** with a unique salt per user
- Password history of last 5 passwords is enforced — reuse is rejected
- Password complexity is validated via Zod schema (min 8 chars, upper, lower, number, symbol)
- Staff must change password on first login

### Authentication
- Access tokens expire after **15 minutes**
- Refresh tokens rotate on every use — reuse detection invalidates the entire session family
- 2FA via TOTP is mandatory for all Staff and Admin roles, optional for Customers
- Accounts lock after **5 consecutive failed login attempts** with a configurable lockout duration

### Transport & Headers
- All traffic served over **TLS 1.3** — TLS 1.0/1.1 are disabled
- Nginx enforces **HSTS** with a one-year max-age
- **Content Security Policy** prevents XSS by whitelisting trusted script and style sources
- Helmet.js sets `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and more

### Rate Limiting (Redis-backed)
- Login: 5 requests per 15 minutes per IP
- OTP verification: 3 requests per 10 minutes per user
- Transfer: 20 requests per hour per authenticated user
- All other endpoints: 100 requests per minute per IP

### Audit Logging
Every state-changing action is written to `AuditLog` with:
- Action type and entity affected
- Old and new values (for update operations)
- Performing user ID, IP address, and User-Agent
- Suspicious flag (set automatically for anomalous patterns)

Audit logs are **append-only** at the database level — no UPDATE or DELETE is permitted on the `AuditLog` table via application roles.

---

## Testing

### Run all tests

```bash
pnpm test
```

### Unit tests (Vitest)

```bash
pnpm --filter api test:unit
```

Covers: interest calculation, loan amortization, fee application, FX conversion, password validation, RBAC rules.

### API integration tests (Supertest)

```bash
pnpm --filter api test:integration
```

Runs against an isolated PostgreSQL test database. Tests every endpoint's authentication, authorization, input validation, and response schema.

### End-to-end tests (Playwright)

```bash
pnpm --filter web test:e2e
```

Critical journeys covered:
- Login → 2FA → Dashboard
- Customer: Transfer → Beneficiary → OTP Confirm → Receipt
- Teller: Deposit → Print Receipt
- Staff: Loan Application → Approval → Disbursement
- Admin: View Audit Log → Export Report

### Coverage report

```bash
pnpm test:coverage
```

---

## Deployment

### Production Docker Compose

```bash
docker compose -f docker-compose.prod.yml up -d
```

### Kubernetes (Helm chart)

```bash
helm install bankms ./helm/bankms \
  --namespace banking \
  --set image.tag=1.0.0 \
  --set postgresql.enabled=false \
  --set externalDatabase.url="postgresql://..."
```

### CI/CD Pipeline (GitHub Actions)

The pipeline defined in `.github/workflows/deploy.yml` runs on every push to `main`:

```
Lint & Type Check → Unit Tests → Integration Tests → Build Docker Images
→ Push to Registry → Deploy to Staging → Smoke Tests → Manual Gate → Production
```

### Database Backups

Automated daily backups are configured via a cron job:

```bash
# Backup script (runs in Docker sidecar)
pg_dump -Fc bankdb > backup_$(date +%Y%m%d_%H%M%S).dump
aws s3 cp backup_*.dump s3://bankms-backups/
```

---

## Team

This project was developed by students of Addis Ababa Science and Technology University.

| Elias Derbew | Ets0432/15 |


---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with care by the AASTU ECE Student · Department of Electrical and Computer Engineering (Computer Engineering Streem)

</div>
