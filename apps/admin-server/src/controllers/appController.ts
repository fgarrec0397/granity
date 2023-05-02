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
        : {
              savedScenes: {
                  scenes: oldestApp?.savedScenes?.scenes,
                  editedAt: oldestApp?.savedScenes?.editedAt,
                  name: oldestApp?.savedScenes?.name,
              },
          };

    const publishedScenes = newApp.publishedScenes
        ? {
              ...newApp.publishedScenes,
              scenes: JSON.stringify(newApp.publishedScenes.scenes),
          }
        : {
              publishedScenes: {
                  scenes: oldestApp?.publishedScenes?.scenes,
                  editedAt: oldestApp?.publishedScenes?.editedAt,
                  name: oldestApp?.publishedScenes?.name,
              },
          };

    const mappedApp = {
        savedScenes,
        publishedScenes,
        status: newApp.status,
    };

    console.log(mappedApp, "mappedApp");

    appModel.create(mappedApp);

    res.send(mappedApp);
};
