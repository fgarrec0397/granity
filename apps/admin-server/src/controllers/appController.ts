import { Request, Response } from "express";
import appModel from "../model/appModel";

export const getApp = async (req: Request, response: Response) => {
    const oldestApp = await appModel.findOne({}, {}, { sort: { createdAt: -1 } }).exec();

    const defaultApp = {
        savedScenes: {
            scenes: "",
            editedAt: new Date(),
            name: "",
        },
        publishedScenes: {
            scenes: "",
            editedAt: new Date(),
            name: "",
        },
        status: "published",
    };

    if (oldestApp == null) {
        return response.send(defaultApp);
    }

    response.send(oldestApp);
};

export const postApp = async (req: Request, res: Response) => {
    const oldestApp = await appModel.findOne({}, {}, { sort: { createdAt: -1 } }).exec();

    const newApp = req.body;
    const savedScenes = newApp.savedScenes
        ? {
              ...newApp.savedScenes,
              scenes: JSON.stringify(newApp.savedScenes.scenes),
          }
        : oldestApp?.savedScenes;

    const publishedScenes = newApp.publishedScenes
        ? {
              ...newApp.publishedScenes,
              scenes: JSON.stringify(newApp.publishedScenes.scenes),
          }
        : oldestApp?.publishedScenes;

    const mappedApp = {
        ...newApp,
        savedScenes,
        publishedScenes,
    };

    console.log(mappedApp, "mappedApp");

    const newAppModel = new appModel(mappedApp);

    newAppModel.save(function (err: any) {
        if (err) return console.log(err, "err");
    });

    res.send(req.body);
};
