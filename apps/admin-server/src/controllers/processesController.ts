import { Request, Response } from "express";

export const postProcess = async (request: Request, result: Response) => {
    const processName = request.body.processName;
    console.log(processName, "processName");

    result.json("controller hit");
};
