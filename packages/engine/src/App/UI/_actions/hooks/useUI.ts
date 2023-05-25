import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import { GameWidgetProperties } from "@engine/App/Game/_actions/gameTypes";
import { useCallback, useMemo } from "react";

import useUIService from "../_data/hooks/useUIService";

export default () => {
    const { setSelectedWidgetProperties, selectedWidgetProperties } = useUIService();
    const { isEditor, isUIPreview, isPreview, isGamePreview, isGame } = useEditor();

    const showEditorUI = useMemo(() => isEditor || isPreview, [isEditor, isPreview]);
    const showGameUI = useMemo(
        () => isGamePreview || isGame || isUIPreview,
        [isGame, isGamePreview, isUIPreview]
    );
    const showUIPreview = useMemo(() => isGamePreview || isUIPreview, [isGamePreview, isUIPreview]);

    const updateSelectedWidgetProperties = useCallback(
        (properties: GameWidgetProperties) => {
            setSelectedWidgetProperties(properties);
        },
        [setSelectedWidgetProperties]
    );

    return {
        showEditorUI,
        showGameUI,
        showUIPreview,
        selectedWidgetProperties,
        updateSelectedWidgetProperties,
    };
};
