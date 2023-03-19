import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import useHandleEditor from "@engine/App/Editor/_actions/hooks/useHandleEditor";
import Editor from "@engine/App/Editor/Editor";
import { GamePreview } from "@engine/App/Game";
import { FC, Suspense } from "react";

const Scene: FC = () => {
    const { isEditor } = useEditor();

    useHandleEditor();

    return <Suspense>{isEditor ? <Editor.Editor /> : <GamePreview.Game />}</Suspense>;
};

export default Scene;
