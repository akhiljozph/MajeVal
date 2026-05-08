import express, { type Application } from "express";
import mongoose from "mongoose";
import logger from "morgan";
import cors from "cors";

const app: Application = express();

mongoose.connect("mongodb://localhost:27017/crud").then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.log("Error:", error);
});

app.use(logger("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.status(404).send({
        message: "Route not found"
    });
});

app.listen(4000, () => {
    console.log("The server is up...");
});