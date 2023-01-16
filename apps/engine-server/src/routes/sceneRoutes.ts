import express from "express";
import { getScene, saveScene } from "../controllers/sceneController";

const sceneRoutes = () => {
    const router = express.Router();

    router.get("/", getScene).post("/", saveScene);

    return router;
};

export default sceneRoutes;
