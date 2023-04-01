import express from "express";
import { getFiles, postFiles } from "../controllers/filesController";
import filesMiddleware from "../middlewares/filesMiddleware";

const sceneRoutes = () => {
    const router = express.Router();

    router.get("/", getFiles);
    router.post("/", filesMiddleware("filesToUpload"), postFiles);

    return router;
};

export default sceneRoutes;
