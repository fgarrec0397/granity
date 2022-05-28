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
        const oldestScene = await database.getLatest();

        res.send(oldestScene);
    });

    app.post("/api/scene", function (req, res) {
        database.insert(req.body);
        res.send(req.body);
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

main();
