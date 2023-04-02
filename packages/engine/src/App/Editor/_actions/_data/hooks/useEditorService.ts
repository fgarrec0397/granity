import { FetchStatus } from "@engine/App/Core/_actions/coreTypes";
import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import { useMutation, useQueryClient } from "@granity/helpers";
import { useCallback } from "react";

import { FilesData, ModesAvailable } from "../../editorTypes";
import { FilesService } from "../filesService";
import useEditorDispatch from "./useEditorDispatch";
import useEditorSelector from "./useEditorSelector";

export default () => {
    const {
        dispatchSetIsEditor,
        dispatchSetIsEditing,
        dispatchSetHasEditorOpened,
        dispatchSetIsGameUIPreview,
        dispatchSetHasEdited,
        dispatchSetIsMultipleSelect,
        dispatchSetIsGridEnabled,
        dispatchSetCurrentMode,
        dispatchSetFilesData,
        dispatchSetFilesDataStatus,
    } = useEditorDispatch();
    const {
        isEditor,
        hasEdited,
        hasEditorOpened,
        isGameUIPreview,
        isEditing,
        currentMode,
        isGridEnabled,
        filesData,
        filesDataStatus,
    } = useEditorSelector();
    const queryClient = useQueryClient();
    const { endpoints } = useConfig();

    const filesMutation = useMutation({
        mutationKey: ["files"],
        mutationFn: FilesService.save,
    });

    const updateIsEditor = (value: boolean) => {
        dispatchSetIsEditor(value);
    };

    const updateIsEditing = (value: boolean) => {
        dispatchSetIsEditing(value);
    };

    const updateHasEditorOpened = () => {
        dispatchSetHasEditorOpened();
    };

    const updatedIsGameUIPreview = (value: boolean) => {
        dispatchSetIsGameUIPreview(value);
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

    const updateCurrentMode = (value: ModesAvailable) => {
        dispatchSetCurrentMode(value);
    };

    const setFilesData = useCallback(
        (newFilesData: FilesData) => {
            dispatchSetFilesData(newFilesData);
        },
        [dispatchSetFilesData]
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
        async (formData: FormData) => {
            // dispatchSetFilesDataStatus("");
            const data = await filesMutation.mutateAsync({
                endpoint: endpoints.files.save,
                formData,
            });

            return data;
        },
        [endpoints.files.save, filesMutation]
    );

    return {
        isEditor,
        hasEdited,
        hasEditorOpened,
        isEditing,
        isGameUIPreview,
        currentMode,
        isGridEnabled,
        updateIsEditor,
        updateIsEditing,
        updatedIsGameUIPreview,
        updateHasEditorOpened,
        updateHasEdited,
        updatedIsGridEnabled,
        updateIsMultipleSelect,
        updateCurrentMode,
        setFilesData,
        setFilesDataStatus,
        filesDataStatus,
        saveFiles,
        filesData,
        getFilesData,
    };
};
