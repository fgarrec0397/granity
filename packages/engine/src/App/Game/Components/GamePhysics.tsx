import { useEditor } from "@engine/api";
import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import { Physics, PhysicsProps } from "@granity/physics";
import { FC } from "react";

type Props = PhysicsProps;

const GamePhysics: FC<Props> = ({ children, ...props }) => {
    const { physicsEnabled } = useConfig();
    const { isDebugEnabled } = useEditor();

    if (physicsEnabled) {
        return (
            <Physics {...props} debug={isDebugEnabled}>
                {children}
            </Physics>
        );
    }

    return <>{children}</>;
};

export default GamePhysics;
