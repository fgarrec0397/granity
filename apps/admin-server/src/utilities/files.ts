import path from "path";
import fs from "fs";
import { FileItem } from "../controllers/filesController";

export const getFilesPath = (relativePath: string) => {
    const absolutePathToItem = path.join("../admin", "public", relativePath);
    return path.resolve(absolutePathToItem);
};

export const editOrDeleteLastItemOfPath = (pathToRemoveFrom: string, newItemName?: string) => {
    const relativePathArray = pathToRemoveFrom.split(/\/{1,}|\\{1,}/);

    if (!newItemName) {
        relativePathArray.splice(-1, 1);
    }

    if (newItemName) {
        relativePathArray.splice(-1, 1, newItemName);
    }

    if (relativePathArray[0] === "") {
        relativePathArray.shift();
    }

    return relativePathArray.join("/");
};

const getFileExtension = (fileName: string) => {
    const fileNameSplit = fileName.split(".");

    return fileNameSplit[fileNameSplit.length - 1];
};

export const loadFolder = (pathToFolderToLoad: string) => {
    const directoryToRead = getFilesPath(pathToFolderToLoad);

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
