import { Fetcher } from "@granity/helpers";

import { FilesData } from "../editorTypes";

export type FilesServiceParameters<MethodParameters> = MethodParameters & {
    endpoint: string;
};

export type GetFilesParameters = {
    path: string;
};

export type SaveFilesParameters = {
    formData: FormData;
};

export type DeleteFilesParameters = {
    path: string;
    deleteFolder?: "true" | "false";
};

export class FilesService {
    static async get({ endpoint, path }: FilesServiceParameters<GetFilesParameters>) {
        const response = await Fetcher.get<any, FilesData>(
            `${endpoint}?pathToFolderToLoad=${path}`
        );

        return response.data;
    }

    static async save({ endpoint, formData }: FilesServiceParameters<SaveFilesParameters>) {
        const response = await Fetcher.post<FormData, FilesData>(endpoint, formData);

        return response.data;
    }

    static async delete({
        endpoint,
        path,
        deleteFolder,
    }: FilesServiceParameters<DeleteFilesParameters>) {
        const response = await Fetcher.delete<DeleteFilesParameters, FilesData>(endpoint, {
            data: {
                path,
                deleteFolder,
            },
        });

        return response.data;
    }
}
