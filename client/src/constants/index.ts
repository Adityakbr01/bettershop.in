export const APP_CONSTANTS = {
  appName: "betterShop.in",
  appVersion: "1.0.0",
  supportEmail: "support@bettershop.in",
  defaultLanguage: "en",
  apiBaseUrl:
   process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
  ENV:{
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
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",

}