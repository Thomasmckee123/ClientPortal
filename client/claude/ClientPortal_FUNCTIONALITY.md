# ClientPortal — Functionality Guide

> Feature specification and architecture reference for the ClientPortal application.

---

## What Is ClientPortal?

ClientPortal is a branded client portal for freelancers, agencies, and small businesses. It replaces scattered emails, WhatsApp threads, and lost files with a single, professional workspace per client — covering file sharing, project updates, messaging, and invoicing.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite (SPA with React Router) |
| Backend API | C# / ASP.NET Core Web API |
| Database | MongoDB (MongoDB C# Driver / Mongoose for any Node tooling) |
| Auth | ASP.NET Identity or custom JWT (magic link + Google OAuth) |
| File Storage | Azure Blob Storage (or S3-compatible) |
| Payments | Stripe (checkout, billing portal, webhooks) |
| PDF Generation | C# service using QuestPDF |
| Hosting | Azure (API + static SPA) or Vercel (SPA) + Azure (API) |

---

## Project Structure

```
/
├── client/                         # Vite + React SPA
│   ├── src/
│   │   ├── pages/                  # Route-level components
│   │   │   ├── Landing.tsx         # Marketing landing page
│   │   │   ├── Login.tsx           # Magic link + Google OAuth
│   │   │   ├── Signup.tsx          # Registration
│   │   │   ├── Dashboard.tsx       # Owner dashboard
│   │   │   ├── PortalView.tsx      # Client-facing portal (/p/:slug)
│   │   │   └── InvoiceView.tsx     # Invoice detail page
│   │   ├── components/             # Shared UI components
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── services/               # API client / fetch wrappers
│   │   ├── context/                # Auth & app-level context providers
│   │   ├── router.tsx              # React Router configuration
│   │   ├── App.tsx
│   │   └── main.tsx                # Vite entry point
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── server/                         # C# ASP.NET Core Web API
│   ├── Controllers/
│   │   ├── AuthController.cs       # Login, register, magic link, OAuth
│   │   ├── PortalsController.cs    # CRUD for portals
│   │   ├── FilesController.cs      # Upload / download endpoints
│   │   ├── TasksController.cs      # Task board CRUD
│   │   ├── MessagesController.cs   # Messaging endpoints
│   │   ├── InvoicesController.cs   # Invoice CRUD + PDF generation
│   │   └── StripeController.cs     # Webhooks + checkout sessions
│   ├── Models/                     # MongoDB document models
│   │   ├── User.cs
│   │   ├── Portal.cs
│   │   ├── ClientRecord.cs
│   │   ├── FileRecord.cs
│   │   ├── TaskItem.cs
│   │   ├── Message.cs
│   │   ├── Invoice.cs
│   │   ├── InvoiceItem.cs
│   │   └── Subscription.cs
│   ├── Services/                   # Business logic & integrations
│   │   ├── MongoDbService.cs       # MongoDB connection + repos
│   │   ├── StripeService.cs        # Stripe integration
│   │   ├── PdfService.cs           # QuestPDF invoice generation
│   │   ├── EmailService.cs         # Magic link + notification emails
│   │   └── StorageService.cs       # Azure Blob / S3 file storage
│   ├── Middleware/
│   │   └── AuthMiddleware.cs       # JWT validation + role checks
│   ├── Program.cs
│   ├── appsettings.json
│   └── server.csproj
```

---

## Authentication

### Method

Authentication handled via the C# backend using JWT tokens with two sign-in options:

1. **Magic link** — passwordless email login for both owners and clients. The API generates a signed token, emails it to the user, and validates it on return.
2. **Google OAuth** — one-click sign-in for owners via Google Identity, exchanged for a JWT on the backend.

The React SPA stores the JWT in memory (or an httpOnly cookie) and attaches it to every API request. User records are stored in the MongoDB `users` collection.

### Client Invitation Flow

1. Owner creates a portal and enters the client's email address.
2. System sends the client a magic-link invitation.
3. Client clicks the link and lands directly in their branded portal — no password to set.

---

## Core Features (Must Have)

### 1. Portal Management

- Owners can create, edit, and archive client portals from the dashboard.
- Each portal has a unique slug (`/p/[slug]`) and acts as a self-contained workspace.
- The dashboard displays portal cards showing the client name, email, file count, and invoice/payment status at a glance.
- Dashboard stats bar: active portals, total clients, unpaid invoices, revenue this month.

### 2. File Upload & Download

- Powered by Supabase Storage (or any S3-compatible provider).
- Owners upload files to a portal; clients can download them at any time.
- File list shows filename, size, and upload date with a download button.
- Planned enhancements: bulk drag-and-drop upload ("Could Have").

### 3. Project Status / Task Board

- Simple three-column Kanban: To Do, In Progress, Done.
- Each task shows a title and status tag.
- Circular checkbox marks tasks complete (with strikethrough styling).
- Visible to both owner and client so everyone knows where the project stands.

### 4. Messaging Thread

- One persistent message thread per portal between the owner and client.
- Replaces email and WhatsApp for project-related communication.
- Email notifications when a new message is sent ("Should Have").

### 5. Invoice Creation & Tracking

- Owners create invoices within a portal.
- Invoice statuses: Draft → Sent → Paid.
- Invoice document view includes: From/To parties, line items (description, quantity, rate, amount), subtotal, tax, and total.
- Each invoice has a unique number (e.g. INV-0042) and issue/due dates.
- Invoices can be downloaded as PDF (via the C# Azure Function).

### 6. Stripe Payment Integration

- A "Pay now" button on sent invoices triggers Stripe Checkout.
- Stripe webhook updates the invoice status to "Paid" on successful payment.
- Stripe billing portal allows plan upgrades/downgrades ("Should Have").

### 7. Free vs Pro Plan Enforcement

- **Free plan (£0/mo):** 1 portal, file sharing, basic messaging.
- **Pro plan (£12/mo):** Unlimited portals, custom branding, invoicing + Stripe.
- **Agency plan (£29/mo):** Everything in Pro plus team members and priority support.
- Plan enforcement is handled server-side; the free tier hard-caps at 1 active portal.

---

## Should Have Features

| Feature | Description |
|---------|-------------|
| Custom branding | Per-portal logo and brand colour so the client sees the owner's branding, not ClientPortal's |
| PDF invoice generation | C# Azure Function using QuestPDF renders a professional invoice PDF on demand |
| Email notifications | Triggered when a file is uploaded or a message is sent |
| Client activity log | Tracks "last seen" and "file downloaded" events per client |
| Stripe billing portal | Self-service plan upgrade, downgrade, and payment method management |
| Mobile-responsive design | Client portal must work well on phones and tablets |

---

## Could Have Features

| Feature | Description |
|---------|-------------|
| Custom subdomains | e.g. `client.youragency.com` per portal |
| Portal templates | Pre-built project types like "Web Design Project" or "Monthly Retainer" |
| Bulk file upload | Drag-and-drop multiple files at once |
| Invoice line item templates | Saved services for quick invoice creation |
| In-app notifications | Toast messages and badge counts |
| Dark mode | Theme toggle using CSS custom properties |
| CSV export | Download invoices and payment history as CSV |

---

## Won't Have (v1)

These are explicitly out of scope for the first version:

- Native mobile apps (iOS / Android)
- Video calls or screen recording
- Time tracking / timesheets
- Multi-currency invoicing
- Two-way calendar sync
- Public proposal / quote signing flow

---

## Key User Flows

### Owner: Create a Portal and Invite a Client

1. Owner logs in → lands on dashboard.
2. Clicks "+ New portal".
3. Fills in client name, email, and optional brand settings.
4. System creates the portal and sends the client a magic-link invite.
5. Portal card appears on the dashboard.

### Owner: Create and Send an Invoice

1. Owner navigates to a portal → Invoices tab.
2. Clicks "New invoice".
3. Adds line items (description, quantity, rate).
4. System calculates subtotal, tax, and total.
5. Owner clicks "Send" — status moves from Draft to Sent.
6. Client receives a notification and sees the invoice in their portal.

### Client: View Portal and Pay Invoice

1. Client clicks the magic link from their email.
2. Lands on the portal overview showing files, tasks, and outstanding balance.
3. Navigates to Invoices → clicks an unpaid invoice.
4. Clicks "Pay now" → redirected to Stripe Checkout.
5. On success, invoice status updates to Paid.

### Client: Download a File

1. Client navigates to Files tab.
2. Sees a list of uploaded files with name, size, and date.
3. Clicks "Download" on the desired file.

---

## Page Map

| Route (React Router) | View | Access |
|----------------------|------|--------|
| `/` | Marketing landing page (hero, features, pricing) | Public |
| `/login` | Magic link + Google OAuth login | Public |
| `/signup` | Account registration | Public |
| `/dashboard` | Owner dashboard with portal grid and stats | Owner (authenticated) |
| `/dashboard/invoices` | All invoices across portals | Owner |
| `/dashboard/messages` | All message threads | Owner |
| `/dashboard/clients` | Client directory | Owner |
| `/dashboard/billing` | Stripe billing portal | Owner |
| `/dashboard/settings` | Account and app settings | Owner |
| `/p/:slug` | Client-facing portal (overview, files, tasks, messages, invoices) | Client (invited) |

Protected routes are wrapped in an `<AuthGuard>` component that checks the JWT before rendering.

---

## Environment Variables

**React client** (`.env` in `/client`):
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

**C# API** (`appsettings.json` or environment variables in `/server`):
```json
{
  "MongoDB": {
    "ConnectionString": "your_mongodb_connection_string",
    "DatabaseName": "clientportal"
  },
  "Jwt": {
    "Secret": "your_jwt_secret",
    "Issuer": "ClientPortal",
    "ExpiryMinutes": 1440
  },
  "Google": {
    "ClientId": "your_google_oauth_client_id",
    "ClientSecret": "your_google_oauth_client_secret"
  },
  "Stripe": {
    "SecretKey": "your_stripe_secret_key",
    "WebhookSecret": "your_stripe_webhook_secret"
  },
  "AzureStorage": {
    "ConnectionString": "your_azure_blob_connection_string",
    "ContainerName": "portal-files"
  },
  "Email": {
    "SmtpHost": "your_smtp_host",
    "ApiKey": "your_email_api_key"
  }
}
```

---

## Database (MongoDB)

Data is stored in MongoDB using the official MongoDB C# Driver. Each collection maps to a C# model class in `server/Models/`.

### Collections

| Collection | Purpose |
|------------|---------|
| `users` | Owner accounts (email, name, hashed password or OAuth provider, plan tier) |
| `portals` | One document per client portal (slug, name, branding, ownerId ref) |
| `clients` | Invited client records linked to a portal (email, portalId ref, lastSeen) |
| `files` | File metadata (name, size, storagePath, portalId ref, uploadedAt) |
| `tasks` | Task board items (title, status enum: `todo` / `in_progress` / `done`, portalId ref) |
| `messages` | Message thread entries (body, senderId ref, portalId ref, createdAt) |
| `invoices` | Invoice header (invoiceNumber, status enum: `draft` / `sent` / `paid`, issueDate, dueDate, portalId ref) |
| `invoiceitems` | Line items embedded or referenced (description, qty, rate, invoiceId ref) |
| `subscriptions` | Stripe subscription state per owner (stripeCustomerId, stripePriceId, status) |

### Key Relationships

MongoDB references (ObjectId refs, resolved via lookup queries or manual joins in the C# service layer):

- `portals.ownerId` → `users._id`
- `clients.portalId` → `portals._id`
- `files.portalId` → `portals._id`
- `tasks.portalId` → `portals._id`
- `messages.portalId` → `portals._id`
- `messages.senderId` → `users._id`
- `invoices.portalId` → `portals._id`
- `invoiceitems.invoiceId` → `invoices._id`

### Access Control

ASP.NET middleware and authorization filters ensure owners only access their own portals (`portal.OwnerId == userId`) and clients only access the portal they were invited to (`client.PortalId` match). JWT claims carry the user ID and role, validated on every request.

---

## Build Plan

| Weekend | Goal |
|---------|------|
| 1 | Auth, dashboard, create portal, invite client |
| 2 | File uploads, task board |
| 3 | Messaging, invoice creation |
| 4 | Stripe payments, C# Azure PDF generator |
| 5 | Branding, landing page, deploy, launch |

---

## Running Locally

### Prerequisites

- Node.js 18+ (for the Vite frontend)
- .NET 8 SDK (for the C# API)
- MongoDB running locally or a MongoDB Atlas connection string

### Start the C# API

```bash
cd server
dotnet restore
dotnet run
# API runs on http://localhost:5000
```

### Start the React client

```bash
cd client
npm install
npm run dev
# Vite dev server runs on http://localhost:5173, proxies API calls to :5000
```
