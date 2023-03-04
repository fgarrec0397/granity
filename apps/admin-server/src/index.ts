import express from "express";
import Database from "./Database/Database";
import routes from "./routes/_routes";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

const port = process.env.SERVER_PORT;

app.use(express.json());

// app.use(
//     cors({
//         origin: "http://127.0.0.1:3000",
//     })
// );

mongoose.set("strictQuery", false);

const main = async () => {
    Database.getInstance();

    app.use("/", routes());

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

main();
