import express from "express";
import authRoutes from "./authRoutes";
import filesRoutes from "./filesRoutes";
import processesRoutes from "./processesRoutes";
import sceneRoutes from "./sceneRoutes";

const routes = () => {
    const router = express.Router();

    router.use("/scenes", sceneRoutes());
    router.use("/auth", authRoutes());
    router.use("/files", filesRoutes());
    router.use("/processes", processesRoutes());

    return router;
};

export default routes;
