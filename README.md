# SaaS Cohort Management Platform

A comprehensive SaaS platform for managing educational cohorts where mentors can create and manage cohorts, and students can enroll, track progress, and interact within cohorts.

## 🚀 Features

### Core Functionality
- **Cohort Management**: Create, manage, and organize educational cohorts
- **User Management**: Role-based access control (Admin, Student, Instructor)
- **Student Enrollment**: Easy enrollment and progress tracking
- **Interactive Learning**: Student-mentor interaction within cohorts
- **Progress Tracking**: Monitor student progress and engagement
- **API Documentation**: Auto-generated Swagger/OpenAPI documentation

### Technical Features
- **Authentication & Authorization**: JWT-based authentication with role management
- **Rate Limiting**: Built-in API rate limiting for security
- **Real-time Logging**: Comprehensive logging with Winston
- **Error Handling**: Global error handling with custom error classes
- **Security**: Helmet, CORS, CSRF protection, and security headers
- **Database**: PostgreSQL with Prisma ORM
- **API Validation**: Zod schema validation with OpenAPI integration

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Zod with OpenAPI integration
- **Documentation**: Swagger UI
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston with daily rotate files
- **Process Management**: Cluster mode for scalability

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier
- **Build Tools**: TypeScript compiler, tsc-alias
- **Development**: Nodemon, tsx for hot reloading

## 📁 Project Structure

```
Saas_cohort_management/
├── Server/                     # Backend application
│   ├── src/
│   │   ├── api/               # API documentation (OpenAPI/Swagger)
│   │   │   ├── components/    # Reusable API components
│   │   │   ├── paths/         # API endpoint definitions
│   │   │   └── schemas/       # Data schemas
│   │   ├── configs/           # Configuration files
│   │   ├── controllers/       # Route controllers (empty - to be implemented)
│   │   ├── db/               # Database connection
│   │   ├── middleware/        # Express middleware
│   │   ├── routes/           # API routes (empty - to be implemented)
│   │   ├── services/         # Business logic services
│   │   ├── types/            # TypeScript type definitions
│   │   ├── utils/            # Utility functions
│   │   ├── validator/        # Zod validation schemas
│   │   └── server.ts         # Express server setup
│   ├── prisma/               # Database schema and migrations
│   ├── package.json
│   └── index.ts              # Application entry point
│
├── client/                    # Frontend application
│   ├── src/
│   │   ├── app/              # Next.js app router pages
│   │   ├── components/       # React components
│   │   │   ├── ui/           # Reusable UI components
│   │   │   ├── auth/         # Authentication components
│   │   │   └── form/         # Form components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility libraries
│   │   ├── providers/        # React context providers
│   │   ├── queries/          # TanStack Query hooks
│   │   ├── store/            # Zustand state management
│   │   ├── types/            # TypeScript type definitions
│   │   └── utils/            # Utility functions
│   └── package.json
│
└── README.md                 # This file
```

## ⚙️ Installation and Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- pnpm package manager

### Environment Variables

Create a `.env` file in the `Server` directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cohort_management"

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
CORS_ORIGIN2=http://localhost:3000

# JWT Configuration (add these)
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Email Configuration (if using email features)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password

# Payment Integration (if using payments)
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret

# Cloud Storage (if using file uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

Create a `.env.local` file in the `client` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### Backend Setup

1. **Navigate to the server directory:**
   ```bash
   cd Server
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up the database:**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

4. **Start the development server:**
   ```bash
   pnpm dev
   ```

The backend server will start on `http://localhost:3001`

### Frontend Setup

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```

The frontend application will start on `http://localhost:3000`

## 🚀 Usage

### Development

1. **Start both servers:**
   ```bash
   # Terminal 1 - Backend
   cd Server && pnpm dev
   
   # Terminal 2 - Frontend  
   cd client && pnpm dev
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api-docs

### Production Build

1. **Build the backend:**
   ```bash
   cd Server
   pnpm build
   pnpm start
   ```

2. **Build the frontend:**
   ```bash
   cd client
   pnpm build
   pnpm start
   ```

## 📚 API Documentation

The API documentation is automatically generated using Swagger/OpenAPI and is available at:
- **Development**: http://localhost:3001/api-docs
- **Health Check**: http://localhost:3001/api/v1/ping

### API Structure
- All API endpoints are prefixed with `/api/v1`
- Authentication required for protected routes
- Rate limiting: 100 requests per 15 minutes
- Request/Response validation using Zod schemas

## 🔧 Development Workflow

### Available Scripts

**Backend (Server directory):**
```bash
pnpm dev          # Start development server with hot reload
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm format       # Format code with Prettier
```

**Frontend (client directory):**
```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run Next.js linting
```

### Database Operations
```bash
# Generate Prisma client after schema changes
npx prisma generate

# Create and apply new migration
npx prisma migrate dev --name migration_name

# Reset database (development only)
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes and commit:**
   ```bash
   git commit -m "Add your feature description"
   ```
4. **Push to your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Create a Pull Request**

### Code Style Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Write meaningful commit messages
- Add appropriate error handling
- Include proper TypeScript types
- Follow the existing project structure

## 📄 License

This project is licensed under the ISC License.

## 🔮 Roadmap

- [ ] Complete cohort management API implementation
- [ ] Add user authentication and authorization
- [ ] Implement student enrollment system
- [ ] Add progress tracking features
- [ ] Create mentor dashboard
- [ ] Add real-time notifications
- [ ] Implement payment integration
- [ ] Add comprehensive testing suite
- [ ] Deploy to production environment

## 📞 Support

For support and questions, please create an issue in the repository or contact the development team.

---

**Note**: This project is currently in development. The database schema shows e-commerce entities which need to be updated for cohort management functionality. Please refer to the roadmap for upcoming features and improvements and this is AI GENERATED README.
