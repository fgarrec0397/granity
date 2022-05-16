import mongoose from "mongoose";

interface IDatabase {
    connectionString: string;
}

declare class MongoDbConnection {
    getConnection(): Database;
}

class Database implements IDatabase {
    connectionString: string;

    constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    connectToDatabase() {
        return mongoose.connect(this.connectionString);
    }

    insert(data: any) {
        console.log(data, "data");
        const sceneJsonString = JSON.stringify(data);
        console.log(typeof sceneJsonString, "typeof sceneJsonString");
        const schema = new mongoose.Schema({ sceneJsonString: "string" });
        const Scene = mongoose.model("Scene", schema);

        const scene = new Scene({ sceneJsonString });
        scene.save(function (err: any) {
            if (err) return console.log(err, "err");
            console.log("saved");
        });
    }
}

export default Database;
