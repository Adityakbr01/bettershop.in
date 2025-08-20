export const config = {
  PORT: process.env.PORT || 5000
};

export const constant = {
  appName: "betterShop.in",
  appVersion: "1.0.0",

  // Environment names
  ENV: {
    DEV: "development",
    PROD: "production",
    TEST: "testing",
    PORT: process.env.PORT || 5000,
    SESSION_SECRET: process.env.SESSION_SECRET || "secret",
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "google-client-id",
    GOOGLE_CLIENT_SECRET:
      process.env.GOOGLE_CLIENT_SECRET || "google-client-secret",
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || "github-client-id",
    GITHUB_CLIENT_SECRET:
      process.env.GITHUB_CLIENT_SECRET || "github-client-secret",
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL || "http://localhost:5000/api/v1/auth/github/callback",
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:5000/api/v1/auth/google/callback",
    ACCESSTOKEN_EXPIRES_IN: (60 * 60) // 1 hour
  } as const,

  // Role names in the system
  ROLES: {
    ADMIN: "admin",
    USER: "user"
  } as const,

  // API limits
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 min
    MAX_REQUESTS: 100
  },

  // Status codes
  USER_STATUS: {
    ACTIVE: "active",
    INACTIVE: "inactive",
    SUSPENDED: "suspended"
  } as const
} as const;
