# BetterShop.in - E-Commerce Clothing Marketplace

A modern, full-stack e-commerce clothing marketplace built with Next.js and Node.js, featuring comprehensive user and admin functionality for browsing, purchasing, and managing clothing products.

## 🚀 Features

### 👥 User Features
- **Product Browsing**: Browse clothing items by categories, search, and filter
- **Product Details**: View detailed product information, images, size charts, and reviews
- **Shopping Cart**: Add/remove items, manage quantities, apply coupon codes
- **Wishlist**: Save favorite products for later
- **User Authentication**: Secure signup/signin with password reset functionality
- **Order Management**: Place orders, track order status, and view order history
- **Reviews & Ratings**: Rate and review purchased products
- **User Profile**: Manage personal information and addresses
- **Return Requests**: Request returns for eligible products

### 🔧 Admin Features
- **Product Management**: Add, edit, delete products and variants
- **Inventory Management**: Track stock levels, manage product variants (size, color)
- **Category Management**: Organize products into hierarchical categories
- **Order Management**: Process orders, update order status
- **User Management**: View and manage user accounts
- **Coupon Management**: Create and manage discount coupons
- **Analytics**: Track user behavior and sales metrics
- **Return Management**: Handle return requests and approvals

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js with clustering support
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt password hashing
- **File Storage**: Cloudinary for image management
- **Payment Processing**: Razorpay integration
- **Email Service**: Nodemailer with Resend
- **SMS Service**: Twilio integration
- **API Documentation**: Swagger/OpenAPI 3.0
- **Security**: Helmet, CORS, Rate limiting, CSRF protection
- **Logging**: Winston with daily log rotation
- **Monitoring**: Sentry error tracking

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives with custom components
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Development Tools
- **Package Manager**: pnpm
- **Code Quality**: ESLint, Prettier
- **Build Tools**: TypeScript compiler, Turbopack (Next.js)
- **Database Migrations**: Prisma Migrate
- **API Testing**: Swagger UI

## 📁 Project Structure

```
betterShop.in/
├── Server/                 # Backend application
│   ├── src/
│   │   ├── api/           # OpenAPI specifications
│   │   ├── configs/       # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── services/      # Business logic
│   │   ├── repository/    # Data access layer
│   │   ├── utils/         # Utility functions
│   │   └── server.ts      # Express app setup
│   ├── prisma/           # Database schema and migrations
│   └── package.json
├── client/               # Frontend application
│   ├── src/
│   │   ├── app/          # Next.js app router pages
│   │   ├── components/   # Reusable UI components
│   │   ├── lib/          # Utility libraries
│   │   ├── hooks/        # Custom React hooks
│   │   ├── store/        # Zustand state management
│   │   ├── queries/      # TanStack Query hooks
│   │   └── types/        # TypeScript type definitions
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd betterShop.in
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd Server
   pnpm install
   
   # Install frontend dependencies
   cd ../client
   pnpm install
   ```

3. **Environment Setup**
   
   Create `.env` files in both Server and client directories:
   
   **Server/.env**
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/bettershop"
   JWT_SECRET="your-jwt-secret"
   CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   RAZORPAY_KEY_ID="your-razorpay-key"
   RAZORPAY_KEY_SECRET="your-razorpay-secret"
   CORS_ORIGIN="http://localhost:3000"
   ```
   
   **client/.env.local**
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1"
   ```

4. **Database Setup**
   ```bash
   cd Server
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start Development Servers**
   
   **Backend** (Terminal 1):
   ```bash
   cd Server
   pnpm dev
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd client
   pnpm dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api-docs

## 📚 API Documentation

The API is fully documented using OpenAPI 3.0 specification. Access the interactive documentation at:
- **Development**: http://localhost:5000/api-docs
- **Production**: [Your production URL]/api-docs

### Key API Endpoints Pendings

```
Authentication:
POST   /api/v1/auth/signup
POST   /api/v1/auth/signin
POST   /api/v1/auth/logout
POST   /api/v1/auth/github
POST   /api/v1/auth/google
GET    /api/v1/auth/me


Products:
POST    /api/v1/products/create (Admin)
GET     /api/v1/products/
POST    /api/v1/products/category/create (Admin)
GET     /api/v1/products/category

Cart:
GET    /api/v1/cart
POST   /api/v1/cart/items
PUT    /api/v1/cart/items/:id
DELETE /api/v1/cart/items/:id

Orders:
GET    /api/v1/orders
POST   /api/v1/orders
GET    /api/v1/orders/:id

Admin:
GET    /api/v1/admin/users
GET    /api/v1/admin/orders
GET    /api/v1/admin/analytics
```

## 🧪 Testing

```bash
# Run backend tests
cd Server
pnpm test

# Run frontend tests
cd client
pnpm test
```

## 🚀 Deployment

### Backend Deployment
1. Build the application: `pnpm build`
2. Set production environment variables
3. Run database migrations: `npx prisma migrate deploy`
4. Start the server: `pnpm start`

### Frontend Deployment
1. Build the application: `pnpm build`
2. Deploy to your preferred platform (Vercel, Netlify, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: support@bettershop.in
- Documentation: [Project Wiki](link-to-wiki)
- Issues: [GitHub Issues](link-to-issues)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Prisma](https://prisma.io/) for the excellent ORM
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Radix UI](https://radix-ui.com/) for accessible UI primitives
