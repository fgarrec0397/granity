import express from "express";
import Database from "./Database/Database";
import routes from "./routes/_routes";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();

const port = process.env.SERVER_PORT;

app.use(express.json());

mongoose.set("strictQuery", false);

const main = async () => {
    Database.getInstance();

    app.use("/api", routes());

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

main();
