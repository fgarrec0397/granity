import express from "express";
import { getFiles, postFiles, deleteFiles, editFile } from "../controllers/filesController";
import filesMiddleware from "../middlewares/filesMiddleware";

const sceneRoutes = () => {
    const router = express.Router();

    router.get("/", getFiles);
    router.post("/", filesMiddleware("filesToUpload"), postFiles);
    router.patch("/:fileName", editFile);
    router.delete("/", deleteFiles);

    return router;
};

export default sceneRoutes;
