import { FetchStatus } from "@engine/App/Core/_actions/coreTypes";
import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import { useMutation, useQueryClient } from "@granity/helpers";
import { useCallback } from "react";

import { EditorModesAvailable, EditorStatus } from "../../editorConstants";
import { FilesData } from "../../editorTypes";
import { FilesService } from "../filesService";
import useEditorDispatch from "./useEditorDispatch";
import useEditorSelector from "./useEditorSelector";

export default () => {
    const {
        dispatchSetEditorStatus,
        dispatchSetIsEditing,
        dispatchSetHasEditorOpened,
        dispatchSetHasEdited,
        dispatchSetIsMultipleSelect,
        dispatchSetIsGridEnabled,
        dispatchSetCurrentMode,
        dispatchSetFilesData,
        dispatchSetPathToLoadFiles,
        dispatchSetFilesDataStatus,
    } = useEditorDispatch();
    const {
        editorStatus,
        hasEdited,
        hasEditorOpened,
        isEditing,
        currentMode,
        isGridEnabled,
        filesData,
        pathToLoadFiles,
        filesDataStatus,
    } = useEditorSelector();
    const queryClient = useQueryClient();
    const { endpoints } = useConfig();

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

    const updateEditorStatus = (status: EditorStatus) => {
        dispatchSetEditorStatus(status);
    };

    const updateIsEditing = (value: boolean) => {
        dispatchSetIsEditing(value);
    };

    const updateHasEditorOpened = () => {
        dispatchSetHasEditorOpened();
    };

    const updatedIsGridEnabled = (value: boolean) => {
        dispatchSetIsGridEnabled(value);
    };

    const updateHasEdited = useCallback(
        (value: boolean) => {
            dispatchSetHasEdited(value);
        },
        [dispatchSetHasEdited]
    );

    const updateIsMultipleSelect = (value: boolean) => {
        dispatchSetIsMultipleSelect(value);
    };

    const updateCurrentMode = (value: EditorModesAvailable) => {
        dispatchSetCurrentMode(value);
    };

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
        (status: FetchStatus) => {
            dispatchSetFilesDataStatus(status);
        },
        [dispatchSetFilesDataStatus]
    );

    const getFilesData = useCallback(
        async (path: string) => {
            dispatchSetFilesDataStatus("isLoading");
            const data = await queryClient.fetchQuery(["files"], {
                queryFn: () => FilesService.get({ endpoint: endpoints.files.get, path }),
            });

            if (data) {
                dispatchSetFilesData(data);
                setFilesDataStatus("isSuccess");
            }

            if (!data) {
                setFilesDataStatus("isError");
            }

            return data;
        },
        [
            dispatchSetFilesData,
            dispatchSetFilesDataStatus,
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
        editorStatus,
        hasEdited,
        hasEditorOpened,
        isEditing,
        currentMode,
        isGridEnabled,
        updateEditorStatus,
        updateIsEditing,
        updateHasEditorOpened,
        updateHasEdited,
        updatedIsGridEnabled,
        updateIsMultipleSelect,
        updateCurrentMode,
        setFilesData,
        setPathToLoadFiles,
        setFilesDataStatus,
        filesDataStatus,
        saveFiles,
        editFile,
        deleteFile,
        filesData,
        pathToLoadFiles,
        getFilesData,
    };
};
