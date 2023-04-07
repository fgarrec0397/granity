import { Request, Response } from "express";
import path from "path";
import fs from "fs";

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

const getFileExtension = (fileName: string) => {
    const fileNameSplit = fileName.split(".");

    return fileNameSplit[fileNameSplit.length - 1];
};

export const getRootFilesFolder = () => {
    return path.resolve("../admin", "public");
};

const loadFolder = (pathToFolderToLoad: string) => {
    const directoryToRead = path.join(getRootFilesFolder(), pathToFolderToLoad);

    const directoryData = fs.readdirSync(directoryToRead, { withFileTypes: true });

    const foundFiles = directoryData.filter((x) => x.isFile());
    const foundDirectories = directoryData.filter((x) => x.isDirectory());

    const files = foundFiles.map((x) => {
        const itemPath = path.join("/", pathToFolderToLoad, x.name);
        const file: FileItem = {
            path: itemPath,
            name: x.name,
            type: getFileExtension(x.name),
        };

        return file;
    });

    const folders = foundDirectories.map((x) => {
        const itemPath = path.join("/", pathToFolderToLoad, x.name);
        const file: FileItem = {
            path: itemPath,
            name: x.name,
            type: "folder",
        };

        return file;
    });

    return {
        currentRootPath: pathToFolderToLoad,
        files,
        folders,
    };
};

export const getFiles = async ({ query }: Request, result: Response<ResponseData>) => {
    const pathToFolderToLoad = String(query.pathToFolderToLoad);

    const directoryToRead = path.join(getRootFilesFolder(), pathToFolderToLoad);

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
    const folderName = request.body.folderName || "New Folder";
    const currentFolderPath = path.resolve("../admin", "public", currentPath);
    const newFolderPath = path.resolve(currentFolderPath, folderName);

    if (request.body.addFolder === "true") {
        if (!fs.existsSync(newFolderPath)) {
            fs.mkdirSync(newFolderPath);
        }
    }

    const folderData = loadFolder(currentPath);

    result.statusCode = 200;
    result.json(folderData);
};

export const deleteFiles = (request: Request, result: Response) => {
    const filePath = request.body.path;
    console.log(filePath, "filePath");
    console.log(request.body, "request.body");
    // const folderPathToDelete = path.resolve("../admin", "public", filePath);

    // if (!fs.existsSync(folderPathToDelete)) {
    //     fs.rmdir(folderPathToDelete, { recursive: true }, (err) => {
    //         if (err) {
    //             throw err;
    //         }

    //         console.log(`${folderPathToDelete} is deleted!`);
    //     });
    // }

    // // if (request.body.addFolder === "true") {
    // //     if (!fs.existsSync(newFolderPath)) {
    // //         fs.mkdirSync(newFolderPath);
    // //     }
    // // }

    // // const folderData = loadFolder(folderPathToDelete);

    // result.statusCode = 200;
    // // result.json(folderData);
    result.json("file deleted");
};
