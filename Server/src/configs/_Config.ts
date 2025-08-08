export const config = {
  PORT: process.env.PORT || 5000
};


export const constant = {
  appName: "Edulaunch",
  appVersion: "1.0.0",

  // Environment names
  ENV: {
    DEV: "development",
    PROD: "production",
    TEST: "testing",
  } as const,

  // Role names in the system
  ROLES: {
    ADMIN: "admin",
    STUDENT: "student",
    INSTRUCTOR: "instructor",
  } as const,

  // API limits
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000,  // 15 min
    MAX_REQUESTS: 100,
  },

  // Status codes
  USER_STATUS: {
    ACTIVE: "active",
    INACTIVE: "inactive",
    SUSPENDED: "suspended",
  } as const,
} as const;
