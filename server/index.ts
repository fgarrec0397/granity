// const mongodb = require("mongodb");
import { MongoClient } from "mongodb";

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "youtube3D";

MongoClient.connect(connectionURL, (error, client) => {
    if (error) {
        return console.log(error, "error");
    }

    console.log(client);
});
