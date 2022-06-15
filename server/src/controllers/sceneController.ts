import { Request, Response } from "express";
import mongoose from "mongoose";

const schema = new mongoose.Schema({ sceneJsonString: "string" }, { timestamps: true });
const model = mongoose.model("Scene", schema);

export const getScene = async (req: Request, res: Response) => {
    const oldestScene = await model.findOne({}, {}, { sort: { createdAt: -1 } }).exec();

    if (oldestScene == null) {
        res.send({
            sceneJsonString: "",
        });

        return;
    }

    res.send(oldestScene);
};

export const saveScene = async (req: Request, res: Response) => {
    const sceneJsonString = JSON.stringify(req.body);
    const sceneModel = new model({ sceneJsonString });

    sceneModel.save(function (err: any) {
        if (err) return console.log(err, "err");
    });

    res.send(req.body);
};
