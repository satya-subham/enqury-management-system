import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import databaseConnection from "./config/databaseConnect.js";
import authRoutes from "./routes/auth.routes.js";
import inquriesRoutes from "./routes/inquries.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();
const __dirname = path.resolve();

dotenv.config();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/inquries", inquriesRoutes);
app.use("/api/users", usersRoutes);

app.use("/api/health", (req, res) => {
  res.send("Welcome to the health check api");
});

// Serve frontend in production (only if fullstack on one server)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  databaseConnection(process.env.DB_URL);
  console.log(`Server is running on port ${PORT}`);
});
