import express from "express";
import { getFiles, postFiles } from "../controllers/filesController";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const storagePath = path.resolve("../admin", "public");
        console.log({ storagePath });

        cb(null, storagePath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const sceneRoutes = () => {
    const router = express.Router();

    router.get("/", getFiles);
    router.post("/", upload.array("filesToUpload"), postFiles);

    return router;
};

export default sceneRoutes;
