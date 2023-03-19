import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import useHandleEditor from "@engine/App/Editor/_actions/hooks/useHandleEditor";
// import Editor from "@engine/App/Editor/Editor";
// import { GamePreview } from "@engine/App/Game";
import { FC, lazy, Suspense } from "react";

const Editor = lazy(() =>
    import("@engine/App/Editor/Editor").then((module) => {
        return { default: module.default.Editor };
    })
);

const GamePreview = lazy(() =>
    import("@engine/App/Game").then((module) => {
        return { default: module.GamePreview.Game };
    })
);

const Scenes: FC = () => {
    const { isEditor } = useEditor();

    useHandleEditor();

    return (
        <Suspense fallback={<>is loading...</>}>{isEditor ? <Editor /> : <GamePreview />}</Suspense>
    );
};

export default Scenes;
