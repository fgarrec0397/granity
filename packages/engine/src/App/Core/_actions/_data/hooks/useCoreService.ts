import { useMutation, useQueryClient } from "@granity/helpers";
import { useCallback } from "react";

import { App, FetchStatus, FilesData } from "../../coreTypes";
import useConfig from "../../hooks/useConfig";
import { AppService } from "../appService";
import { FilesService } from "../filesService";
import { ProcessesService } from "../processesService";
import useCoreDispatch from "./useCoreDispatch";
import useCoreSelector from "./useCoreSelector";

export default () => {
    const queryClient = useQueryClient();
    const { endpoints } = useConfig();
    const { app, status, filesData, pathToLoadFiles } = useCoreSelector();
    const {
        dispatchSetApp,
        dispatchSetStatus,
        dispatchSetFilesData,
        dispatchSetPathToLoadFiles,
        dispatchSetFilesStatus,
    } = useCoreDispatch();

    const saveFilesMutation = useMutation({
        mutationKey: ["files"],
        mutationFn: FilesService.post,
        onSuccess: (data) => {
            queryClient.setQueryData(["files", data.currentRootPath], data);
        },
    });

    const editFilesMutation = useMutation({
        mutationKey: ["files"],
        mutationFn: FilesService.patch,
        onSuccess: (data) => {
            queryClient.setQueryData(["files", data.currentRootPath], data);
        },
    });

    const deleteFilesMutation = useMutation({
        mutationKey: ["files"],
        mutationFn: FilesService.delete,
        onSuccess: (data) => {
            queryClient.setQueryData(["files", data.currentRootPath], data);
        },
    });

    const setStatus = useCallback(
        (newStatus: FetchStatus) => {
            dispatchSetStatus(newStatus);
        },
        [dispatchSetStatus]
    );

    const saveAppMutation = useMutation({
        mutationKey: ["app"],
        mutationFn: AppService.save,
        onMutate: () => {
            setStatus("loading");
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["app"], data);
            setTimeout(() => {
                setStatus("success");
            }, 10000);
        },
        onError: () => {
            setStatus("error");
        },
    });

    const postProcessMutation = useMutation({
        mutationKey: ["process"],
        mutationFn: ProcessesService.post,
        onMutate: () => {
            setStatus("loading");
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["process"], data);
            setStatus("success");
        },
        onError: () => {
            setStatus("error");
        },
    });

    const generateJsxFromGlb = useCallback(
        async (fileToProcess: string) => {
            await postProcessMutation.mutateAsync({
                endpoint: endpoints.processes.generateJsxFromGlb,
                processName: "runGltfjsxCommand",
                fileToProcess,
            });
        },
        [endpoints.processes.generateJsxFromGlb, postProcessMutation]
    );

    const save = async (newApp: App) => {
        const data = await saveAppMutation.mutateAsync({
            endpoint: endpoints.app.save,
            app: newApp,
        });

        return data;
    };

    const setApp = useCallback(
        (newApp: App) => {
            dispatchSetApp(newApp);
        },
        [dispatchSetApp]
    );

    const setFilesData = useCallback(
        (newFilesData: FilesData) => {
            dispatchSetFilesData(newFilesData);
        },
        [dispatchSetFilesData]
    );

    const setPathToLoadFiles = useCallback(
        (newPathToLoad: string) => {
            dispatchSetPathToLoadFiles(newPathToLoad);
        },
        [dispatchSetPathToLoadFiles]
    );

    const setFilesDataStatus = useCallback(
        (newStatus: FetchStatus) => {
            dispatchSetFilesStatus(newStatus);
        },
        [dispatchSetFilesStatus]
    );

    const getFilesData = useCallback(
        async (path: string) => {
            dispatchSetFilesStatus("loading");
            const data = await queryClient.fetchQuery(["files"], {
                queryFn: () => FilesService.get({ endpoint: endpoints.files.get, path }),
            });

            if (data) {
                dispatchSetFilesData(data);
                setFilesDataStatus("success");
            }

            if (!data) {
                setFilesDataStatus("error");
            }

            return data;
        },
        [
            dispatchSetFilesData,
            dispatchSetFilesStatus,
            endpoints.files.get,
            queryClient,
            setFilesDataStatus,
        ]
    );

    const saveFiles = useCallback(
        async (
            currentPath: string,
            files?: FileList,
            newFolderName?: string,
            isAddingFolder?: boolean
        ) => {
            const formData = new FormData();

            formData.append("currentPath", currentPath);

            if (isAddingFolder) {
                formData.append("addFolder", String(isAddingFolder));
            }

            if (newFolderName) {
                formData.append("folderName", newFolderName);
            }

            if (files) {
                for (let i = 0; i < files.length; i++) {
                    // Need to send files after all other inputs because Multer does not support it
                    formData.append(`filesToUpload`, files[i]);
                }
            }

            await saveFilesMutation.mutateAsync({
                endpoint: endpoints.files.save,
                formData,
            });
        },
        [endpoints.files.save, saveFilesMutation]
    );

    const editFile = useCallback(
        async (path: string, newName: string) => {
            await editFilesMutation.mutateAsync({
                endpoint: endpoints.files.patch,
                path,
                newName,
            });
        },
        [editFilesMutation, endpoints.files.patch]
    );

    const deleteFile = useCallback(
        async (path: string, deleteFolder?: boolean) => {
            await deleteFilesMutation.mutateAsync({
                endpoint: endpoints.files.delete,
                path,
                deleteFolder: String(deleteFolder) as "true" | "false",
            });
        },
        [deleteFilesMutation, endpoints.files.delete]
    );

    return {
        generateJsxFromGlb,
        save,
        app,
        setApp,
        status,
        setStatus,
        filesData,
        pathToLoadFiles,
        setFilesData,
        setPathToLoadFiles,
        setFilesDataStatus,
        getFilesData,
        saveFiles,
        editFile,
        deleteFile,
    };
};
