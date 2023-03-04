import { Schema, model } from "mongoose";

const sceneSchema = new Schema({ sceneJsonString: "string" }, { timestamps: true });

export default model("scene", sceneSchema);
