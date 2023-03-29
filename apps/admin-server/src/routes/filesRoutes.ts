import express from "express";
import { getFiles, postFiles } from "../controllers/filesController";
import multer from "multer";

const upload = multer();

const sceneRoutes = () => {
    const router = express.Router();

    router.get("/", getFiles);
    router.post("/", upload.array("filesToUpload"), postFiles);

    return router;
};

export default sceneRoutes;
