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

export type EditFilesParameters = {
    path: string;
    newName?: string;
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

    static async post({ endpoint, formData }: FilesServiceParameters<SaveFilesParameters>) {
        const response = await Fetcher.post<FormData, FilesData>(endpoint, formData);

        return response.data;
    }

    static async patch({ endpoint, path, newName }: FilesServiceParameters<EditFilesParameters>) {
        const response = await Fetcher.patch<EditFilesParameters, FilesData>(endpoint, {
            data: {
                path,
                newName,
            },
        });

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
