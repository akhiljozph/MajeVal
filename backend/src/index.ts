import dotenv from 'dotenv';

dotenv.config({ path: './src/configs/.env' });

import cors from "cors";
import express, { type Application } from "express";
import logger from "morgan";

import { initializeConnectionToDatabase } from './configs/database.config.ts';
import rootRouter from "./routes/index.ts";

const app: Application = express();

const PORT = process.env.PORT;

initializeConnectionToDatabase();

app.use(logger("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json()); // Used for JSON body parsing
app.use(express.urlencoded({ extended: false })); // Used for URL-encoded body parsing

app.use('/api/v1', rootRouter);

app.listen(PORT, () => {
    console.info(`Hi AJ! I've started and ready for your requests. Hit me at http://localhost:${PORT}:)`);
});