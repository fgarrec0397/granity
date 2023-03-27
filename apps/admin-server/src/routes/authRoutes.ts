import express from "express";
import { createUser, login } from "../controllers/authController";

const authRoutes = () => {
    const router = express.Router();

    router.post("/createUser", createUser).post("/login", login);

    return router;
};

export default authRoutes;
