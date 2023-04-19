import { Request, Response } from "express";
import path from "path";
import { getFilesPath } from "../utilities/files";
import { runCommand } from "../utilities/misc";

export const postProcess = async (request: Request, result: Response) => {
    const processName = request.body.processName;
    const fileToProcess = request.body.fileToProcess;

    const filePath = getFilesPath(fileToProcess);

    if (processName === "runGltfjsxCommand") {
        runCommand(`npx gltfjsx ${filePath} --types`);
    }

    const outputPath = path.resolve("./");

    result.json(outputPath);
};
