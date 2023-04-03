import { post } from "@engine/App/Core/_actions/_data/coreService";

import { FilesData } from "../editorTypes";

export type GetFilesParameters = {
    endpoint: string;
    path: string;
};

export type SaveFilesParameters = {
    endpoint: string;
    formData: FormData;
};

export class FilesService {
    static async get({ endpoint, path }: GetFilesParameters): Promise<FilesData> {
        const result = await fetch(`${endpoint}?pathToFolderToLoad=${path}`);
        return result.json();
    }

    static async save({ endpoint, formData }: SaveFilesParameters) {
        const rawResponse = await post(endpoint, formData, {});

        try {
            console.log(rawResponse, "save rawResponse");

            if (!rawResponse.success) {
                throw new Error("An error occured.");
            }

            return {
                success: true,
            };
        } catch (error: any) {
            return {
                success: false,
                errorMessage: error,
            };
        }
    }
}
