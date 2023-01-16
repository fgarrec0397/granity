import useEditor from "@app/Editor/_actions/hooks/useEditor";

export default () => {
    const { isEditor, isGameUIPreview } = useEditor();

    return {
        showEditorUI: isEditor && !isGameUIPreview,
        showGameUI: !isEditor || isGameUIPreview,
        isGameUIPreview,
    };
};
