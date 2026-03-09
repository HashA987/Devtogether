import express from "express";
import authRoutes from "./routes/auth.js";
import cors from "cors";

const app = express();
app.use(cors());

// middleware

app.use(express.json());

app.use("/api/auth", authRoutes);

export default app;
