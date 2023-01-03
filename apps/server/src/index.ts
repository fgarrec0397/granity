import express from "express";
import Database from "./Database/Database";
import routes from "./routes/routes";
import "dotenv/config";

const app = express();

const port = process.env.SERVER_PORT;

app.use(express.json());

const main = async () => {
    Database.getInstance();

    app.use("/api", routes());

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

main();
