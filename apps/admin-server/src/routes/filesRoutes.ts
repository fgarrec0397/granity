import express from "express";
import { getFiles } from "../controllers/filesController";

const sceneRoutes = () => {
    const router = express.Router();

    router.get("/", getFiles);

    return router;
};

export default sceneRoutes;
