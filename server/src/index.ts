import { MongoClient } from "mongodb";
import express from "express";

const app = express();

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "youtube3D";

// MongoClient.connect(connectionURL, (error, client) => {
//     if (error) {
//         return console.log(error, "error");
//     }

//     console.log(client);
// });

// app.get("/", function (req, res) {
//     res.send("Hello World");
// });

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listen on port ${port}`);
});
