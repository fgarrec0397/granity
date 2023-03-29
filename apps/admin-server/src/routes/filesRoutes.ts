import express from "express";
import { getFiles, postFiles } from "../controllers/filesController";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log({ req, file, cb }, "destination");
        cb(null, "/filepath");
    },

    filename: function (req, file, cb) {
        const filename = "filenametogive";
        req.body.file = filename;
        console.log({ req, file, cb }, "filename");

        // console.log({ file: req.body.file, filename }, "filename");

        cb(null, filename);
    },
});

const storage2 = multer.diskStorage({
    destination: "./upload",
    filename: function (req, file, cb) {
        return cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage2 });

const sceneRoutes = () => {
    const router = express.Router();

    router.get("/", getFiles);
    router.post("/", upload.array("filesToUpload"), postFiles);

    return router;
};

export default sceneRoutes;
