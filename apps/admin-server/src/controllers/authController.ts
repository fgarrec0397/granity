import { Request, Response } from "express";
import userModel from "../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
    console.log("------- create a user -------");
    try {
        const { username, password } = req.body;

        if (!(username && password)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await userModel.findOne({ username });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username: username.toLowerCase(), // sanitize: convert username to lowercase
            password: encryptedPassword,
        });

        const token = jwt.sign({ user_id: user._id, username }, process.env?.TOKEN_KEY || "", {
            expiresIn: "2h",
        });

        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
};

export const login = async (req: Request, res: Response) => {
    console.log("---- login ----");

    try {
        const { username, password } = req.body;

        if (!(username && password)) {
            res.status(400).send("All input is required");
            console.log("All input is required");

            return;
        }
        const user = await userModel.findOne({ username });

        if (user && user.password && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ user_id: user._id, username }, process.env.TOKEN_KEY || "", {
                expiresIn: "2h",
            });

            user.token = token;

            console.log("status 200");

            res.status(200).json(user);
            return;
        }

        console.log("Invalid Credentials");

        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err, "err");

        console.log(err);
    }
};
