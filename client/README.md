# BetterShop.in Client
The frontend application for BetterShop.in e-commerce platform built with Next.js 15.4.5.
## 📚 Documentation
### Project Structure- `src/app/` - Next.js app router pages and layouts
- `src/components/` - Reusable UI components- `src/lib/` - Utility functions and shared logic
- `src/hooks/` - Custom React hooks- `src/store/` - Zustand state management
- `src/queries/` - TanStack Query API hooks- `src/types/` - TypeScript type definitions
### Key Technologies
- Next.js 15.4.5 with App Router- TypeScript
- Tailwind CSS- Zustand for state management
- TanStack Query for API data fetching
- React Hook Form for form handling- Zod for schema validation
## ✨ Implemented Features
### Authentication & User Management- Email & password authentication
- OAuth integration (Google, GitHub)
- User profile management (Pending)
- Address managemen- Order history (Pending)

## 🔧 Development
### Prerequisites
- Node.js v18+
- pnpm package manage### Setup
1. Install dependencies:
```bash
pnpm instal```
2. Set up environment variables:```bash
cp .env.example .env.local```
3. Start development server:
```bash
pnpm dev```
### Testing```bash
pnpm test        # Run testspnpm test:watch  # Watch mode
pnpm test:e2e    # E2E tests```
### Building
```bashpnpm build
pnpm start  # Start production server
```











l

r






















t














