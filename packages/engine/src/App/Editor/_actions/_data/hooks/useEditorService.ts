import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import { useMutation, useQuery } from "@granity/helpers";
import { useCallback } from "react";

import { ModesAvailable } from "../../editorTypes";
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
    } = useEditorSelector();
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

    const getFiles = useCallback(
        (path: string) => {
            const { data } = useQuery(["files"], () =>
                // TODO - set datafiles in the redux store. Just need to find the good way to fetch them
                //  Continue here
                FilesService.get({ endpoint: endpoints.files.get, path })
            );

            if (data) {
                dispatchSetFilesData(data);
            }

            return data;
        },
        [dispatchSetFilesData, endpoints.files.get]
    );

    const saveFiles = useCallback(
        async (formData: FormData) => {
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
        getFiles,
        saveFiles,
    };
};
