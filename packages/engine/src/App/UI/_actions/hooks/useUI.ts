import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";

export default () => {
    const { isEditor, IsUIPreview } = useEditor();

    return {
        showEditorUI: isEditor && !IsUIPreview,
        showGameUI: !isEditor || IsUIPreview,
        IsUIPreview,
    };
};
