import express from "express";
import Database from "./Database/Database";
import routes from "./routes/routes";
import "dotenv/config";

const app = express();

const port = process.env.SERVER_PORT;
const connectionString = process.env.CONNECTION_STRING || "";

app.use(express.json());

const main = async () => {
    const database = new Database(connectionString); // connects to the database using MONGODB cluster URL

    await database.connectToDatabase();

    app.get("/api/scene", async (req, res) => {
        // console.log(req.body, "req.body");
        // console.log(res, "res");
        const oldestScene = await database.getOldest();

        console.log(oldestScene, "oldestScene");

        res.send(oldestScene);
    });

    app.post("/api/scene", function (req, res) {
        // console.log(req.body, "req.body");
        // console.log(res, "res");
        database.insert(req.body);
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

main();
