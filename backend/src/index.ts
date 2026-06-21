import dotenv from 'dotenv';

dotenv.config({ path: './src/configs/.env' });

import cors from "cors";
import express, { type Application } from "express";
// import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import logger from "morgan";

import { initializeConnectionToDatabase } from './configs/database.config.ts';
import rootRouter from "./routes/index.ts";

const app: Application = express();

app.use(helmet()); // Automatically configures, injects, or hides specific headers to add an immediate layer of defense.
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(logger("dev"));
app.use(express.json({ limit: process.env.PAYLOAD_LIMIT })); // Used for JSON body parsing
app.use(express.urlencoded({ extended: true, limit: process.env.PAYLOAD_LIMIT })); // Used for URL-encoded body parsing
// app.use(mongoSanitize()); // To prevent NoSQL injection, but not supported in Express 5.

const PORT = process.env.PORT;

initializeConnectionToDatabase();

app.use('/api/v1', rootRouter);

app.listen(PORT, () => {
    console.info(`Hi AJ! I've started and ready for your requests. Hit me at http://localhost:${PORT}:)`);
});