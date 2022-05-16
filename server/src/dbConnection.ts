import { AnyError, Db, MongoClient } from "mongodb";

const connectionString = "mongodb://127.0.0.1:27017"; // TODO - should be stored in .env file

const dbName = "test";
// const client = new MongoClient(connectionString);

let dbConnection: Db | undefined;

// Connect using MongoClient
const mongoClient = new MongoClient(connectionString);

mongoClient.connect((error, client) => {
    if (error) {
        console.log(error, "error");
    }
    dbConnection = client?.db(dbName);
    console.log(dbConnection, "db in connect");
});
console.log(dbConnection, "db");

export default {
    getDB: () => {
        return dbConnection;
    },
};

// export default {
//     connectToServer: (callback: (error?: AnyError) => void) => {
//         client.connect((error, db) => {
//             if (error || !db) {
//                 return callback(error);
//             }

//             dbConnection = db.db("sample_airbnb");
//             console.log("Successfully connected to MongoDB.");

//             return callback();
//         });
//     },

//     getDb: () => {
//         return dbConnection;
//     },
// };
