import express from "express";
import { getApp, postApp } from "../controllers/appController";

const appRoutes = () => {
    const router = express.Router();

    router.get("/", getApp).post("/", postApp);

    return router;
};

export default appRoutes;
