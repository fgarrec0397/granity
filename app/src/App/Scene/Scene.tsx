import { useHandleEditor, useIsEditing, useIsEditor } from "@app/Editor/_actions/hooks";
import Editor from "@app/Editor/Editor";
import Game from "@app/Game/Game";
import { useHandleGetScene } from "@app/Scene/_actions/hooks";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { FC } from "react";

import { Lights, TransformControls } from "./components";

const Scene: FC = () => {
    const { isEditor } = useIsEditor();
    const { isEditing } = useIsEditing();

    useHandleEditor();
    useHandleGetScene();

    return (
        <Physics paused={isEditor}>
            {/* <> */}
            <Lights />
            {/* <mesh position={[0, 0, 0]}>
                <boxGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>

            {isEditor && (
                <>
                    <TransformControls />
                    <OrbitControls
                        enablePan={!isEditing}
                        enableZoom={!isEditing}
                        enableRotate={!isEditing}
                    />
                </>
            )} */}
            {isEditor ? <Editor.Editor /> : <Game.Game />}
            {/* </> */}
        </Physics>
    );
};

export default Scene;
