import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { getPool } from "./db/pool.js";

const app = express();

const appOrigin = process.env.APP_URL ?? "http://localhost:3000";

const port = Number(process.env.PORT || 4000);

app.use(
  cors({
    origin: appOrigin,
    credentials: true,
  }),
);

app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    await getPool().query("SELECT 1")
    res
      .status(201)
      .json({ status: "ok", service: "Agentic Assistant_Calendar_Service" ,database:"up"});
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status:"error",
      success: false,
      message: "Internal Server Error",
      database:"up"
    });
  }
});

app.listen(port, () => {
  console.log(`Agentic Assistant_Calendar Application running on port ${port}`);
});
