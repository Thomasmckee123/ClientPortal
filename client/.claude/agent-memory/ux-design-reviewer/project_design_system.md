---
name: ClientPortal Design System
description: Design tokens, component library, and patterns used in the ClientPortal SaaS frontend (React + Vite + TailwindCSS v4)
type: project
---

Design system for ClientPortal SPA:

- **Stack**: React 18, Vite, TailwindCSS v4, React Router, TanStack Query
- **Primary color**: Indigo (#4F46E5 / `indigo-600`)
- **CSS tokens** defined in `src/index.css` as `:root` vars (--color-primary, --color-text-primary, etc.) but components use Tailwind classes directly rather than these tokens
- **Component library**: Custom shared components at `src/components/` -- Button, Input, Select, Table. Uses a `cn()` utility (likely clsx+twMerge).
- **Button variants**: primary (indigo), danger (red), secondary (bordered), ghost. Sizes: sm, md. No `disabled` state support.
- **Input component**: Missing focus styles (no focus:ring), missing label association (no `id`/`htmlFor`)
- **Select component**: Also missing focus styles
- **Spacing**: Generally uses `space-y-4`, `space-y-6`, `space-y-8`, `gap-4`, `gap-6`. Page padding `p-8`.
- **Typography scale**: h1=`text-2xl font-bold`, h2=`text-lg font-semibold`, body=`text-sm`
- **Card pattern**: `bg-white rounded-xl border border-gray-200 p-6`
- **Currency**: British Pound (GBP)
- **Sidebar**: Fixed 256px (`w-64`), no mobile responsive handling (no hamburger, no collapse)

**Why:** Understanding the design system is essential for consistent UX reviews across all pages.
**How to apply:** Reference these patterns when evaluating new or changed UI for consistency. Flag deviations.
