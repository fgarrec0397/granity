import mongoose from "mongoose";

interface IDatabase {
    connectionString: string;
}

declare class MongoDbConnection {
    getConnection(): Database;
}

class Database implements IDatabase {
    connectionString: string;
    test: any;

    constructor(connectionString: string) {
        this.connectionString = connectionString;
        const schema = new mongoose.Schema({ sceneJsonString: "string" });
        this.test = mongoose.model("Scene", schema);
    }

    connectToDatabase() {
        return mongoose.connect(this.connectionString);
    }

    insert(data: any) {
        const sceneJsonString = JSON.stringify(data);
        const sceneModel = new this.test({ sceneJsonString });

        // console.log(sceneModel, "sceneModel");
        console.log(sceneJsonString, "sceneJsonString");

        // const scene = new Scene({ sceneJsonString });
        sceneModel.save(function (err: any) {
            if (err) return console.log(err, "err");
            console.log("saved");
        });
    }

    getOldest() {
        return this.test.findOne({}, {}, { sort: { created_at: -1 } }).exec();
    }
}

export default Database;
