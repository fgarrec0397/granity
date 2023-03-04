import { Request, Response } from "express";
import sceneModel from "../model/sceneModel";

export const getScene = async (req: Request, res: Response) => {
    const oldestScene = await sceneModel.findOne({}, {}, { sort: { createdAt: -1 } }).exec();

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
    const newSceneModel = new sceneModel({ sceneJsonString });

    newSceneModel.save(function (err: any) {
        if (err) return console.log(err, "err");
    });

    res.send(req.body);
};
