import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import compression from "compression"
import morgan from "morgan";
import swaggerUi from "swagger-ui-express"
import { errorHandler, notFoundHandler } from "./middleware/globalMiddleware";
import swaggerSpec from "@configs/swagger";
import { constant } from "./configs/_Config";



const Server: Application = express();

Server.disable("x-powered-by");

const limiter = rateLimit({
  windowMs: constant.RATE_LIMIT.WINDOW_MS,
  limit: constant.RATE_LIMIT.MAX_REQUESTS,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: `Too many requests, please try again after ${constant.RATE_LIMIT.WINDOW_MS / 60000} minutes`
  }
});
Server.use(limiter);

const allowedOrigins = [
  process.env.CORS_ORIGIN, // "http://www.edulaunch.shop"
  process.env.CORS_ORIGIN2?.replace(/\/$/, "")
].filter(Boolean);

Server.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    maxAge: 86400
  })
);

Server.use(cookieParser());
Server.use(compression())
Server.use(helmet());
Server.use(morgan("combined"));

// Server.use("/api/v1/payments",paymentRouter)

// Skip JSON parser for Stripe webhook
Server.use((req, res, next) => {
  if (
    req.originalUrl === "/api/v1/payments/stripe/webhook/enrollment" ||
    req.originalUrl === "/api/v1/payments/stripe/webhook"
  ) {
    next(); // skip parsing
  } else {
    express.json({ limit: "24kb" })(req, res, next);
  }
});

Server.use(express.urlencoded({ extended: true, limit: "24kb" }));

Server.use((_, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  next();
});


// ✅ API Docs
// Swagger UI setup
Server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Health Check
Server.get("/", (_, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// ✅ Routes
//Student Routes

//---------------CRON JOB API------------
// ✅ Keep-alive / Cron Ping route
Server.get("/api/v1/ping", (_, res) => {
  const now = new Date().toISOString();
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    success: true,
    message: "Pong! Server is alive.",
    timestamp: now
  });
});

// ✅ Error Handling
Server.use(notFoundHandler);
Server.use(errorHandler);

export default Server;
