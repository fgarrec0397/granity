import express from "express";
import { postProcess } from "../controllers/processesController";

const processesRoutes = () => {
    const router = express.Router();

    router.post("/", postProcess);

    return router;
};

export default processesRoutes;
