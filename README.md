# Évasion

A modern accommodation showcase website with a custom content management interface.

Évasion is built to present and manage a collection of premium accommodations through a polished public website and a dedicated administration area.

The project does not implement an internal booking engine. Availability can be synchronized from external iCal calendars, while booking actions redirect visitors to the configured external booking platform.

**Live website:** https://...

## Overview

Évasion provides two main experiences:

- A responsive public website designed to showcase accommodations, availability, reviews and brand content.
- A custom administration interface allowing authorized users to manage accommodations and editable website content without modifying the codebase.

The application was designed as a production-oriented project with a strong focus on:

- maintainable architecture;
- reusable components;
- responsive design;
- accessibility;
- performance;
- secure server-side validation;
- draft and publication workflows;
- automated testing;
- deployment readiness.

## Features

### Public website

The public website includes:

- Home page
- Accommodation listing
- Individual accommodation pages
- Reviews
- About page
- FAQ
- Contact
- Legal notice
- Privacy policy

Accommodation pages can display:

- name and accommodation type;
- subtitle and descriptions;
- indicative starting price per night;
- guest capacity;
- bedrooms;
- beds;
- bathrooms;
- surface area;
- image gallery;
- highlights;
- amenities;
- access information;
- approximate location;
- availability calendar;
- external booking link;
- guest reviews.

Only accommodations with the `PUBLISHED` status are exposed publicly.

### Accommodation management

The administration area provides a dedicated visual editor for accommodations.

Administrators can manage:

- accommodation identity;
- publication status;
- starting price;
- descriptions;
- key details;
- image gallery;
- cover image;
- presentation image;
- image ordering;
- highlights;
- amenities;
- access information;
- location;
- availability calendar;
- booking URL;
- reviews;
- public review section content.

Accommodation states are:

```text
DRAFT
PUBLISHED
ARCHIVED
```

Published accommodations support a separate modification draft.

This allows an administrator to edit an already published accommodation without immediately changing the public version.

The workflow is:

```text
Published accommodation
        ↓
Edit content
        ↓
Autosaved modification draft
        ↓
Preview changes in the editor
        ↓
Publish changes
        ↓
Public version is replaced
```

The draft can also be discarded to return to the currently published version.

### Autosave

The accommodation editor automatically saves modifications after a short debounce period.

For published accommodations, autosave writes to a separate draft instead of modifying the live version.

The editor exposes several save states:

```text
Pending
Saving
Saved
Error
```

Manual publication synchronizes the editor state immediately after the draft has been promoted to the public version.

### Editable public pages

The administration interface also includes dedicated editors for:

- Home
- Accommodations page
- Reviews
- About
- FAQ
- Contact
- Legal information

These editors use the same general editor architecture as the accommodation editor, with a configuration sidebar and a live preview.

### Availability

Each accommodation can be linked to an external iCal calendar.

The application:

- fetches the calendar server-side;
- parses unavailable periods;
- displays availability to visitors;
- caches external calendar responses;
- limits response size;
- limits redirects;
- applies request timeouts;
- blocks private and reserved network ranges.

The iCal fetch implementation includes SSRF protections before accessing external URLs.

Local demo calendars are also available for development and seeded accommodations.

### Booking

Évasion deliberately does not process reservations or payments.

Each accommodation can define an external booking URL.

The public availability section guides visitors toward that external platform once they have checked the accommodation availability.

### Reviews

Reviews are associated with individual accommodations.

Administrators can import reviews from CSV files.

The import process handles:

- validation;
- duplicate detection;
- existing reviews;
- import statistics;
- accommodation association.

Reviews can then be displayed:

- on accommodation pages;
- on the dedicated reviews page;
- in selected sections of the home page.

### Contact form

The contact form supports:

- accommodation-specific requests;
- general requests;
- accommodation selection;
- server-side validation;
- Cloudflare Turnstile verification;
- IP-based rate limiting;
- email delivery through Resend.

Contact submissions are sent directly by email and are not stored as messages in the application database.

### Authentication and authorization

Administration access uses Better Auth with Google authentication.

Authentication alone is not sufficient to access the administration area.

Only Google accounts whose email address is explicitly listed in:

```env
ADMIN_EMAILS=
```

are authorized.

Unauthorized accounts are rejected during account creation.

Administrative server actions also perform authorization checks server-side.

### Media management

Accommodation and page images are managed with UploadThing.

The administration interface supports:

- image upload;
- image deletion;
- image ordering;
- accommodation cover selection;
- accommodation presentation image selection;
- page-specific images.

### SEO

The application includes:

- page metadata;
- canonical site URL handling;
- dynamic sitemap generation;
- `robots.txt`;
- semantic page structure;
- optimized Next.js images.

## Tech Stack

### Application

- Next.js 16
- React 19
- TypeScript
- App Router
- Server Components
- Server Actions

### Styling and interface

- Tailwind CSS 4
- Base UI
- shadcn
- Lucide
- Motion
- Embla Carousel
- Leaflet

### Forms and validation

- React Hook Form
- Zod
- `@hookform/resolvers`

### Database

- PostgreSQL
- Prisma 7
- Prisma PostgreSQL adapter

### Authentication

- Better Auth
- Google OAuth

### External services

- UploadThing — image storage
- Resend — contact emails
- Upstash Redis — contact rate limiting
- Cloudflare Turnstile — anti-bot protection

### Testing

- Vitest
- Testing Library
- jsdom
- Playwright

### Continuous integration

- GitHub Actions
- PostgreSQL service containers
- dependency security audit
- TypeScript validation
- ESLint
- unit/integration tests
- production build
- critical E2E tests

## Requirements

Before running the project locally, install:

- Node.js 20 or newer
- pnpm 10
- PostgreSQL

You will also need credentials for the external services used by the parts of the application you want to test.

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/vbruchon/evasion.git
cd evasion
pnpm install
```

Create the local environment file:

```bash
cp .env.example .env
```

Then configure the required environment variables.

## Environment Variables

```env
DATABASE_URL=

NEXT_PUBLIC_SITE_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
ADMIN_EMAILS=

UPLOADTHING_TOKEN=

RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

### Database

`DATABASE_URL` must point to a PostgreSQL database.

Example:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/evasion
```

### Site URL

For local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Better Auth

Generate a strong secret containing at least 32 characters:

```env
BETTER_AUTH_SECRET=your-secure-secret
BETTER_AUTH_URL=http://localhost:3000
```

### Google OAuth

Create Google OAuth credentials and configure:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

The authorized callback URL must match the Better Auth Google callback endpoint for the environment being used.

### Admin access

Provide one or more authorized administrator email addresses:

```env
ADMIN_EMAILS=admin@example.com
```

Multiple administrators can be separated with commas:

```env
ADMIN_EMAILS=admin@example.com,other-admin@example.com
```

Email comparison is case-insensitive.

### UploadThing

Required for image uploads:

```env
UPLOADTHING_TOKEN=
```

### Resend

Required for contact form email delivery:

```env
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=
```

### Upstash Redis

Used to rate-limit contact submissions:

```env
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

### Cloudflare Turnstile

Used to protect the public contact form:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

## Database Setup

Generate the Prisma client:

```bash
pnpm db:generate
```

Apply the development migrations:

```bash
pnpm db:migrate
```

Seed the database:

```bash
pnpm db:seed
```

The seed creates demo accommodations, reviews and editable public page content.

To completely reset and recreate the local development database:

```bash
pnpm db:refresh
```

Be careful: this command deletes the existing local database content.

## Development

Start the development server:

```bash
pnpm dev
```

Then open:

```text
http://localhost:3000
```

The administration login page is available at:

```text
http://localhost:3000/connexion
```

Once authenticated with an authorized Google account, the administration area is available under:

```text
/admin
```

## Main Routes

### Public

```text
/                           Home
/logements                  Accommodations
/logements/[slug]           Accommodation detail
/avis                       Reviews
/a-propos                   About
/faq                        FAQ
/contact                    Contact
/mentions-legales           Legal notice
/politique-de-confidentialite
```

### Administration

```text
/admin
/admin/logements
/admin/logements/nouveau
/admin/logements/[id]/modifier
/admin/accueil
/admin/nos-logements
/admin/avis
/admin/a-propos
/admin/faq
/admin/contact
/admin/informations-legales
```

## Project Structure

```text
app/
├── (website)/              Public website routes
├── admin/                  Administration routes and server actions
├── api/                    Auth, UploadThing and demo APIs
└── connexion/              Admin authentication

src/
├── components/
│   ├── features/           Feature-specific UI
│   ├── layout/             Shared layout components
│   └── ui/                 Reusable UI primitives
│
├── hooks/
│   └── accommodations/     Accommodation editor logic
│
├── lib/
│   ├── accommodations/     Public accommodation domain
│   ├── admin/              Administration domain
│   ├── contact/            Contact workflow
│   ├── home/               Home content
│   ├── about/              About content
│   ├── faq/                FAQ content
│   ├── reviews/            Reviews domain
│   ├── legal/              Legal content
│   └── seo/                SEO helpers
│
└── generated/
    └── prisma/             Generated Prisma client

prisma/
├── migrations/             Database migrations
├── seeds/                  Demo accommodation data
├── schema.prisma
└── seed.ts

tests/
├── accommodations/
├── accommodations-page/
├── admin/
├── about/
├── contact/
├── faq/
├── home/
├── legal/
├── reviews/
└── e2e/
```

## Testing

### Test environment

Create the test environment file:

```bash
cp .env.test.example .env.test
```

Configure a dedicated test database:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/evasion_test
```

Do not use the development or production database for automated tests.

Prepare the test database:

```bash
pnpm test:db:prepare
```

Run all Vitest tests:

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm test:watch
```

### Feature test suites

Individual suites can also be executed:

```bash
pnpm test:accommodations
pnpm test:accommodations-page
pnpm test:reviews
pnpm test:about
pnpm test:faq
pnpm test:contact
pnpm test:home
pnpm test:legal
pnpm test:admin
```

## End-to-End Tests

Create the E2E environment file:

```bash
cp .env.e2e.example .env.e2e
```

The default configuration expects a dedicated PostgreSQL database:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/evasion_e2e
```

Run the critical Playwright flows:

```bash
pnpm test:e2e
```

This command automatically:

1. validates the E2E database;
2. generates the Prisma client;
3. resets the E2E database;
4. applies migrations;
5. seeds demo data;
6. creates the authenticated admin state;
7. starts the application;
8. runs Playwright.

An interactive Playwright session is also available:

```bash
pnpm test:e2e:ui
```

The E2E suite covers critical workflows such as:

- public navigation;
- administrator access;
- contact form behavior;
- accommodation creation;
- accommodation editing;
- autosave;
- starting price editing;
- publication;
- public accommodation rendering.

## Pre-Commit Validation

Before committing changes, run:

```bash
pnpm can-commit
```

This performs:

```text
TypeScript type checking
ESLint
git diff validation
Accommodation tests
Accommodation page tests
Reviews tests
About tests
FAQ tests
Contact tests
Home tests
Legal tests
Admin tests
```

Critical E2E tests remain separate:

```bash
pnpm test:e2e
```

A recommended validation before merging a substantial feature is therefore:

```bash
pnpm can-commit
pnpm test:e2e
```

## Useful Commands

| Command               | Description                                          |
| --------------------- | ---------------------------------------------------- |
| `pnpm dev`            | Start the development server                         |
| `pnpm build`          | Generate Prisma Client and create a production build |
| `pnpm start`          | Start the production server                          |
| `pnpm lint`           | Run ESLint                                           |
| `pnpm db:generate`    | Generate Prisma Client                               |
| `pnpm db:migrate`     | Create/apply development migrations                  |
| `pnpm db:seed`        | Seed demo data                                       |
| `pnpm db:reset`       | Reset the development database                       |
| `pnpm db:refresh`     | Reset, generate and seed the development database    |
| `pnpm test`           | Run all Vitest tests                                 |
| `pnpm test:e2e`       | Prepare and run Playwright E2E tests                 |
| `pnpm test:e2e:ui`    | Run Playwright using its interactive UI              |
| `pnpm can-commit`     | Run the complete pre-commit quality suite            |
| `pnpm security:audit` | Audit production dependencies                        |

## Continuous Integration

GitHub Actions runs two main jobs.

### Quality & Build

The quality pipeline:

```text
Install dependencies
        ↓
Audit production dependencies
        ↓
Start PostgreSQL test database
        ↓
Generate Prisma Client
        ↓
Prepare test database
        ↓
Run pnpm can-commit
        ↓
Seed database
        ↓
Build the application
```

### Critical E2E

The E2E pipeline:

```text
Start isolated PostgreSQL database
        ↓
Create E2E environment
        ↓
Install Playwright Chromium
        ↓
Reset and seed database
        ↓
Create authenticated admin session
        ↓
Run critical Playwright tests
```

Playwright reports are uploaded as CI artifacts when an E2E run fails.

## Security

Several protections are implemented throughout the project:

- server-side admin authorization;
- explicit administrator email allowlist;
- Google OAuth authentication;
- Zod validation of user-controlled data;
- Cloudflare Turnstile on contact requests;
- IP-based contact rate limiting;
- protected image management;
- external iCal URL validation;
- private network blocking for iCal requests;
- redirect limits for remote calendars;
- remote response size limits;
- request timeouts;
- production dependency security auditing;
- isolated test and E2E databases.

Secrets must never be committed to the repository.

Use the provided `.env.example`, `.env.test.example` and `.env.e2e.example` files as templates only.

## Deployment

The application is designed to be deployed on Vercel with a PostgreSQL database such as Neon.

Before deploying:

- provision a PostgreSQL database;
- configure all production environment variables;
- configure the production Better Auth URL;
- configure the production Google OAuth callback URL;
- configure UploadThing;
- configure Resend;
- configure Upstash Redis;
- configure Cloudflare Turnstile;
- apply Prisma migrations;
- verify the authorized administrator emails.

The production build can be validated locally with:

```bash
pnpm build
```

Database migrations intended for deployed environments should be applied using Prisma's deployment migration workflow rather than creating migrations directly in production.

## Design Principles

Évasion was built around several architectural principles:

### Feature-oriented organization

Business-specific components and logic are grouped by feature instead of being concentrated into large generic files.

### Server-side authority

Sensitive mutations, authentication checks and data validation are performed server-side.

### Explicit draft workflow

Changes to published accommodation content remain isolated from the public website until explicitly published.

### Reusable editor architecture

Public page editors share common workspace, sidebar, navigation and preview primitives while keeping their domain logic separated.

### Progressive enhancement

The public website remains focused on content and browsing, while richer interactive features are progressively layered on top.

### Clear scope

Évasion is intentionally not:

- a property management system;
- a payment platform;
- an internal reservation engine;
- a marketplace;
- a generic CMS.

Its purpose is to provide a polished public accommodation website with a focused administration experience.

## Status

The project includes:

```text
✓ Public accommodation website
✓ Responsive layouts
✓ Custom administration interface
✓ Accommodation CRUD
✓ Draft and publication workflow
✓ Autosave
✓ Starting prices
✓ Image management
✓ iCal availability
✓ External booking links
✓ Reviews and CSV import
✓ Editable public pages
✓ Google admin authentication
✓ Contact protection and email delivery
✓ SEO foundations
✓ Unit and integration tests
✓ Critical Playwright E2E coverage
✓ GitHub Actions CI
✓ Security hardening
```

The application is currently structured as a production-ready foundation for an accommodation showcase website with a custom CMS.
