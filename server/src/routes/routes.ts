import express from "express";
import sceneRoutes from "./sceneRoutes";

const routes = () => {
    const router = express.Router();

    router.use("/scene", sceneRoutes());

    return router;
};

export default routes;
