import { FileText, Home, Package, Percent, Settings, ShoppingCart, Tag, Users } from "lucide-react";

export const APP_CONSTANTS = {
  appName: "betterShop.in",
  appVersion: "1.0.0",
  supportEmail: "support@bettershop.in",
  defaultLanguage: "en",
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
  ENV: {
    DEV: "development",
    PROD: "production",
    TEST: "testing",
    BACKEND_URL: "http://localhost:3001",
    FRONTEND_URL: "http://localhost:3000",
    GOOGLE_URL: "http://localhost:3001/api/v1/auth/google",
    GITHUB_URL: "http://localhost:3001/api/v1/auth/github",
    ACCESSTOKEN_EXPIRES_IN: 60 * 60 * 1000 // 15 min
  }
};


export const Routes = {
  rootRoute: "http://localhost:3000",
  HOME: "/",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  Admin: {
    routes: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: Home,
        bgColor: "cbg4"
      },
      {
        title: "Products",
        url: "/admin/products",
        icon: Package,
        bgColor: "cbg4"
      },
      {
        title: "Orders",
        url: "/admin/orders",
        icon: ShoppingCart,
        bgColor: "cbg4"
      },
      {
        title: "Customers",
        url: "/admin/customers",
        icon: Users,
        bgColor: "cbg4"
      },
      {
        title: "Promotionals",
        url: "/admin/promotionals",
        icon: Tag,
        bgColor: "cbg4"
      },
      {
        title: "Coupons",
        url: "/admin/coupons",
        icon: Percent,
        bgColor: "cbg4"
      },
      {
        title: "Audit Logs",
        url: "/admin/auditlogs",
        icon: FileText,
        bgColor: "cbg5"
      },
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
        bgColor: "cbg3"
      },
    ]
  },

  PROFILE: "/profile",
}

