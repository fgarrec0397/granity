import express from "express";
import dbo from "./dbConnection";

const app = express();

const db = dbo.getDb();

// dbo.collection("users").insertOne({
//     name: "fabrice",
//     age: 24,
// });

app.get("/", function (req, res) {
    res.send("Hello World");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listen on port ${port}`);
});
