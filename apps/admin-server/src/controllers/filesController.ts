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

type FileItem = {
    path: string;
    name: string;
    type: string;
};

const getFileExtension = (fileName: string) => {
    const fileNameSplit = fileName.split(".");

    return fileNameSplit[fileNameSplit.length - 1];
};

const rootFolderName = "assets";

const getRootFilesFolder = () => {
    return path.resolve("../admin", "public", rootFolderName);
};

export const getFiles = async ({ query }: Request, result: Response<ResponseData>) => {
    console.log(
        typeof query.pathToFolderToLoad,
        query.pathToFolderToLoad,
        "query.pathToFolderToLoad"
    );

    const pathToFolderToLoad =
        query.pathToFolderToLoad !== rootFolderName ? String(query.pathToFolderToLoad) : "";
    const relativePathFromPublicFolder = `${rootFolderName}${
        pathToFolderToLoad ? "/" + pathToFolderToLoad : ""
    }`;

    const directoryToRead = path.resolve(getRootFilesFolder(), pathToFolderToLoad);

    console.log(directoryToRead, "directoryToRead");

    if (!fs.existsSync(directoryToRead)) {
        result.statusCode = 404;
        result.json("folder does not exist");
    }

    const directoryData = fs.readdirSync(directoryToRead, { withFileTypes: true });

    const foundFiles = directoryData.filter((x) => x.isFile());
    const foundDirectories = directoryData.filter((x) => x.isDirectory());

    console.log(foundFiles, "foundFiles");
    console.log(foundDirectories, "foundDirectories");

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

    result.statusCode = 200;
    result.json({
        currentRootPath: relativePathFromPublicFolder,
        files,
        folders,
    });
};
