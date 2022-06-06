import { PerspectiveCamera, PointerLockControls } from "@react-three/drei";
import { FC } from "react";
import useIsEditor from "../../Editor/state/hooks/useIsEditor";

const GameCamera: FC = () => {
    const { isEditor } = useIsEditor();

    return (
        <>
            {/* <PerspectiveCamera makeDefault={!isEditor} /> */}
            {!isEditor && <PointerLockControls />}
        </>
    );
};

export default GameCamera;
