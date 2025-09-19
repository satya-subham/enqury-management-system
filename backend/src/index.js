import express from "express";
import dotenv from "dotenv";
import CORS from "cors";
import cookieParser from "cookie-parser";

import path from 'path';

import databaseConnection from "./config/databaseConnect.js";
import authRoutes from "./routes/auth.routes.js";
import inquriesRoutes from "./routes/inquries.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();
const __dirname = path.resolve();
dotenv.config();
app.use(
  CORS({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/inquries", inquriesRoutes);
app.use("/api/users", usersRoutes);

app.use("/api/health", (req, res) => {
  res.send("Welcome to the health check api");
});
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist'/ 'index.html'));
  });
}
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  databaseConnection(process.env.DB_URL);
  console.log(`Server is running on port ${PORT}`);
});
