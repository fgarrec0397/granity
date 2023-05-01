import { Schema, model } from "mongoose";

const appSchema = new Schema(
    {
        savedScenes: {
            scenes: "string",
            editedAt: "date",
            name: "string",
        },
        publishedScenes: {
            scenes: "string",
            editedAt: "date",
            name: "string",
        },
        status: "string",
    },
    { timestamps: true }
);

export default model("app", appSchema);
