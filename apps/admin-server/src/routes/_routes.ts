import express from "express";
import authRoutes from "./authRoutes";
import sceneRoutes from "./sceneRoutes";

const routes = () => {
    const router = express.Router();

    router.use("/scene", sceneRoutes());
    router.use("/auth", authRoutes());

    return router;
};

export default routes;
