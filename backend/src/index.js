import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["https://sidlink.onrender.com"], // ✅ Frontend origin
  credentials: true, // ✅ Required for cookies
}));

// Test endpoint
app.get("/", (req, res) => {
  res.send("API Working");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// 🛡️ Optional: fallback for unhandled /api routes to avoid sending index.html
app.use("/api", (req, res, next) => {
  res.status(404).json({ message: "API route not found" });
});

// Serving frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start server
server.listen(PORT, "0.0.0.0", () => {
  console.log("Server is running on PORT: " + PORT);
  connectDB();
});
