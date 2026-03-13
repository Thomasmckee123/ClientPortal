# ClientPortal

> A simple, branded client portal for freelancers, agencies and small businesses — built with Next.js, Supabase, Stripe and C# Azure Functions.

---

## 🧭 Overview

ClientPortal gives you a single, clean link to share with every client. No more files lost in email, no more WhatsApp chaos, no more unpaid invoices. Just a professional space for files, updates, messages and invoices — with your branding on it.

**Stack:** Next.js · Supabase · Stripe · C# Azure Functions · Vercel

---

## 🎯 MoSCoW Prioritisation

### 🔴 Must Have
*Core features — the app is not usable without these.*

- [ ] User authentication (Supabase Auth — magic link + Google OAuth)
- [ ] Create and manage client portals
- [ ] Invite clients via email with a magic link
- [ ] File upload and download (Supabase Storage)
- [ ] Project status / task board (todo, in progress, done)
- [ ] Messaging thread between owner and client
- [ ] Invoice creation and status tracking (draft, sent, paid)
- [ ] Stripe payment integration for invoices
- [ ] Free vs Pro plan enforcement (1 portal limit on free)

---

### 🟠 Should Have
*High value features — important but not blocking launch.*

- [ ] Custom branding per portal (logo, brand colour)
- [ ] PDF invoice generation via C# Azure Function (QuestPDF)
- [ ] Email notifications when a file is uploaded or message is sent
- [ ] Client activity log (last seen, file downloaded)
- [ ] Stripe billing portal for plan upgrades/downgrades
- [ ] Mobile-responsive design for client portal

---

### 🟡 Could Have
*Nice to have — add if time allows.*

- [ ] Custom subdomain per portal (e.g. `client.youragency.com`)
- [ ] Portal templates (e.g. "Web Design Project", "Monthly Retainer")
- [ ] Bulk file upload with drag-and-drop
- [ ] Invoice line item templates / saved services
- [ ] In-app notifications (toast / badge count)
- [ ] Dark mode support
- [ ] CSV export of invoices / payments

---

### ⚪ Won't Have (this version)
*Explicitly out of scope for v1.*

- ❌ Native mobile app (iOS / Android)
- ❌ Built-in video calls or screen recording
- ❌ Time tracking / timesheets
- ❌ Multi-currency invoicing
- ❌ Two-way calendar sync (Google Calendar, Outlook)
- ❌ Public proposal / quote signing flow

---

## 🗂️ Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── (marketing)/        # Landing page, pricing
│   ├── (auth)/             # Login, signup
│   ├── dashboard/          # Owner dashboard
│   └── p/[slug]/           # Client-facing portal
├── components/             # Shared UI components
├── lib/
│   ├── supabase.ts         # Supabase client
│   └── stripe.ts           # Stripe helpers
├── azure-functions/        # C# Azure Functions project
│   └── InvoicePdfFunction/ # PDF generation function
└── supabase/
    └── migrations/         # DB schema migrations
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Stripe](https://stripe.com) account
- .NET 8 SDK (for the Azure Function)
- An [Azure](https://azure.microsoft.com) subscription

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
AZURE_FUNCTION_URL=your_azure_function_url
```

### Install & Run

```bash
npm install
npm run dev
```

---

## 🗓️ Build Plan

| Weekend | Goal |
|---------|------|
| 1 | Auth, dashboard, create portal, invite client |
| 2 | File uploads, task board |
| 3 | Messaging, invoice creation |
| 4 | Stripe payments, C# Azure PDF generator |
| 5 | Branding, landing page, deploy, launch |

---

## 💰 Pricing

| Plan | Price | Portals | Branding |
|------|-------|---------|----------|
| Free | £0/mo | 1 | — |
| Pro | £12/mo | Unlimited | ✅ |
| Agency | £29/mo | Unlimited | ✅ + Team members |

---

## 📄 Licence

MIT
