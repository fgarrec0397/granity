import path from "path";
import mongoose from "mongoose";
import winston from "winston";
import "dotenv/config";

const connectionString = process.env.CONNECTION_STRING || "";

class Database {
    private readonly _logger: winston.Logger;
    private static _instance: Database;

    private constructor() {
        this._logger = winston.createLogger({
            level: "info",
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: path.join(__dirname, "../logs.log"),
                    level: "info",
                }),
            ],
        });

        console.log(connectionString, "connectionString");

        mongoose
            .connect(connectionString)
            .catch((e: Error) => this._logger.error(`MongoDB connection failed with error: ${e}`));
    }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new Database();
        return this._instance;
    }

    public get logger() {
        return this._logger;
    }
}

export default Database;
