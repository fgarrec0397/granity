import mongoose from "mongoose";

interface IDatabase {
    connectionString: string;
}

class Database implements IDatabase {
    connectionString: string;
    test: any;

    constructor(connectionString: string) {
        this.connectionString = connectionString;
        const schema = new mongoose.Schema({ sceneJsonString: "string" }, { timestamps: true });
        this.test = mongoose.model("Scene", schema);
    }

    connectToDatabase() {
        return mongoose.connect(this.connectionString);
    }

    insert(data: any) {
        const sceneJsonString = JSON.stringify(data);
        const sceneModel = new this.test({ sceneJsonString });

        sceneModel.save(function (err: any) {
            if (err) return console.log(err, "err");
        });
    }

    getLatest() {
        return this.test.findOne({}, {}, { sort: { createdAt: -1 } }).exec();
    }
}

export default Database;
