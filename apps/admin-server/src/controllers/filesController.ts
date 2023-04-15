import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { editOrDeleteLastItemOfPath, getFilesPath, loadFolder } from "../utilities/files";

type ResponseData =
    | {
          currentRootPath: string;
          folders: FileItem[];
          files: FileItem[];
      }
    | string;

export type FileItem = {
    path: string;
    name: string;
    type: string;
};

export const getFiles = async ({ query }: Request, result: Response<ResponseData>) => {
    const pathToFolderToLoad = String(query.pathToFolderToLoad);
    const directoryToRead = getFilesPath(pathToFolderToLoad);

    if (!fs.existsSync(directoryToRead)) {
        result.statusCode = 404;
        return result.json("Folder does not exist");
    }

    const folderData = loadFolder(pathToFolderToLoad);

    result.statusCode = 200;
    result.json(folderData);
};

export const postFiles = (request: Request, result: Response) => {
    const currentPath = request.body.currentPath;
    const isAddingFolder = request.body.addFolder;
    const folderName = request.body.folderName || "New Folder";
    const currentFolderPath = path.resolve("../admin", "public", currentPath);
    const newFolderPath = path.resolve(currentFolderPath, folderName);

    if (isAddingFolder === "true") {
        if (!fs.existsSync(newFolderPath)) {
            fs.mkdirSync(newFolderPath);
        }
    }

    const folderData = loadFolder(currentPath);

    result.statusCode = 200;
    result.json(folderData);
};

export const editFile = (request: Request, result: Response) => {
    const data = request.body.data;
    const relativePathOfItem = data.path;
    const newFileName = data.newName;

    const pathToItem = getFilesPath(relativePathOfItem);

    const elementPath = editOrDeleteLastItemOfPath(relativePathOfItem);
    const editedElementPath = editOrDeleteLastItemOfPath(relativePathOfItem, newFileName);

    const newPathToItem = getFilesPath(editedElementPath);

    if (fs.existsSync(pathToItem)) {
        fs.renameSync(pathToItem, newPathToItem);
    }

    const folderData = loadFolder(elementPath);

    result.statusCode = 200;

    return result.json(folderData);
};

export const deleteFiles = (request: Request, result: Response) => {
    const relativePathOfItem = request.body.path;
    const isDeletingFolder = request.body.deleteFolder;

    const deletedElementPath = editOrDeleteLastItemOfPath(relativePathOfItem);

    const pathToItem = getFilesPath(relativePathOfItem);

    if (isDeletingFolder === "true" && fs.existsSync(pathToItem)) {
        try {
            fs.rmSync(pathToItem, { recursive: true });
        } catch (error) {
            result.statusCode = 404;

            return result.json("Folder not found");
        }
    }

    if (isDeletingFolder !== "true") {
        try {
            fs.unlinkSync(pathToItem);
        } catch (error) {
            console.error(error);
            result.statusCode = 404;

            return result.json("Folder not found");
        }
    }

    const folderData = loadFolder(deletedElementPath);

    result.statusCode = 200;

    return result.json(folderData);
};
