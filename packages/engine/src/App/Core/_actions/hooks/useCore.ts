import { App, AppScenes, FetchStatus, useScenes } from "@engine/api";
import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import { isEqual } from "@granity/helpers";
import { useCallback } from "react";

import useCoreService from "../_data/hooks/useCoreService";

export default () => {
    const { onEditorPointerMissed, isEditor, isPreview } = useEditor();
    const { saveScenes } = useScenes();
    const { generateJsxFromGlb, save, app, setApp, setStatus, status } = useCoreService();

    const onCorePointerMissed = useCallback(
        (event: MouseEvent) => {
            if (isEditor || isPreview) {
                onEditorPointerMissed(event);
            }
        },
        [isEditor, isPreview, onEditorPointerMissed]
    );

    const saveApp = useCallback(() => {
        const scenes = saveScenes();

        if (scenes) {
            const savedScenes: AppScenes = {
                scenes,
                editedAt: new Date(),
                name: "",
            };

            const isSavedSceneIsPublished = isEqual(
                savedScenes.scenes,
                app?.publishedScenes?.scenes
            );

            const savedApp: App = {
                ...app,
                savedScenes,
                status: isSavedSceneIsPublished ? "published" : "saved",
            };

            save(savedApp);
        }
    }, [app, save, saveScenes]);

    const publishApp = useCallback(() => {
        const publishedApp: App = {
            ...app,
            publishedScenes: app?.savedScenes,
            status: "published",
        };

        save(publishedApp);
    }, [app, save]);

    const updateApp = useCallback(
        (newApp: App) => {
            setApp(newApp);
        },
        [setApp]
    );

    const updateStatus = useCallback(
        (newStatus: FetchStatus) => {
            setStatus(newStatus);
        },
        [setStatus]
    );

    return {
        app,
        appStatus: status,
        onCorePointerMissed,
        generateJsxFromGlb,
        saveApp,
        updateApp,
        updateStatus,
        publishApp,
    };
};
