import { deleteRequest, post } from "@engine/App/Core/_actions/_data/coreService";
import { EmptyObject } from "@granity/helpers";

import { FilesData } from "../editorTypes";

export type GetFilesParameters = {
    endpoint: string;
    path: string;
};

export type SaveFilesParameters = {
    endpoint: string;
    formData: FormData;
};

export type DeleteFilesParameters = {
    endpoint: string;
    formData: FormData;
};

export class FilesService {
    static async get({ endpoint, path }: GetFilesParameters): Promise<FilesData> {
        const result = await fetch(`${endpoint}?pathToFolderToLoad=${path}`);
        return result.json();
    }

    static async save({ endpoint, formData }: SaveFilesParameters) {
        const response = await post<FilesData, FormData, EmptyObject>(endpoint, formData, {});

        try {
            if (!response.success) {
                throw new Error("An error occured.");
            }

            return response;
        } catch (error: any) {
            return {
                success: false,
                errorMessage: error,
            };
        }
    }

    static async delete({ endpoint, formData }: DeleteFilesParameters) {
        const response = await deleteRequest<FilesData, FormData, EmptyObject>(
            endpoint,
            formData,
            {}
        );

        try {
            if (!response.success) {
                throw new Error("An error occured.");
            }

            return response;
        } catch (error: any) {
            return {
                success: false,
                errorMessage: error,
            };
        }
    }
}
