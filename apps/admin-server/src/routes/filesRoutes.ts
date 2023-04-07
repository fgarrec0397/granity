import express from "express";
import { getFiles, postFiles, deleteFiles } from "../controllers/filesController";
import filesMiddleware from "../middlewares/filesMiddleware";

const sceneRoutes = () => {
    const router = express.Router();

    router.get("/", getFiles);
    router.post("/", filesMiddleware("filesToUpload"), postFiles);
    router.delete("/", deleteFiles);

    return router;
};

export default sceneRoutes;
