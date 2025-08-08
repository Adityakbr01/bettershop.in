export const APP_CONSTANTS = {
  appName: "EduLaunch",
  appVersion: "1.0.0",
  supportEmail: "support@edulaunch.com",
  defaultLanguage: "en",
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api"
};


export const Routes = {
  HOME: "/",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
}