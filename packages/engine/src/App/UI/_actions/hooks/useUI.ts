import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";

export default () => {
    const { isEditor, isUIPreview, isPreview, isGamePreview, isGame } = useEditor();

    return {
        showEditorUI: isEditor || isPreview,
        showGameUI: isGamePreview || isGame,
        isUIPreview,
    };
};
