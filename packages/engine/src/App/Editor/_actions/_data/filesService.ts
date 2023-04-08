import { deleteRequest } from "@engine/App/Core/_actions/_data/coreService";
import { EmptyObject, Fetcher } from "@granity/helpers";

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
    path: string;
};

export class FilesService {
    static async get({ endpoint, path }: GetFilesParameters) {
        const response = await Fetcher.get<any, FilesData>(
            `${endpoint}?pathToFolderToLoad=${path}`
        );

        return response.data;
    }

    static async save({ endpoint, formData }: SaveFilesParameters) {
        const response = await Fetcher.post<FormData, FilesData>(endpoint, formData);

        return response.data;
    }

    static async delete({ endpoint, path }: DeleteFilesParameters) {
        const response = await Fetcher.delete<
            {
                path: string;
            },
            FilesData
        >(endpoint, {
            data: {
                path,
            },
        });

        console.log(response, "response");

        return response;
    }
}
