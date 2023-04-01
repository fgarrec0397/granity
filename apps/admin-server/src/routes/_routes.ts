import express from "express";
import authRoutes from "./authRoutes";
import filesRoutes from "./filesRoutes";
import sceneRoutes from "./sceneRoutes";

const routes = () => {
    const router = express.Router();

    router.use("/scenes", sceneRoutes());
    router.use("/auth", authRoutes());
    router.use("/files", filesRoutes());

    return router;
};

export default routes;
