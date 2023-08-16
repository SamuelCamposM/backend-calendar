import express from "express";
import { config } from "dotenv";
import cors from "cors";
config();
import { authRouter } from "./routes/auth";
import { dbConnection } from "./db/config";
import { eventRouter } from "./routes/events";
dbConnection();

const app = express();

// CORS
app.use(cors());

app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/events", eventRouter);
app.listen(process.env.PORT, () =>
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
);
