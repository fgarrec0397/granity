import { Db, MongoClient } from "mongodb";

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "youtube3D";

let dbConnection: Db | undefined;

MongoClient.connect(connectionURL, (error, client) => {
    if (error) {
        return console.error(error, "error");
    }

    dbConnection = client?.db(databaseName);
});

export default {
    getDb: function () {
        return dbConnection;
    },
};
