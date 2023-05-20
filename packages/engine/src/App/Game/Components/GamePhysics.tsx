import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import { Physics, PhysicsProps } from "@granity/physics";
import { FC } from "react";

type Props = PhysicsProps;

const GamePhysics: FC<Props> = ({ children, ...props }) => {
    const { physicsEnabled } = useConfig();

    if (physicsEnabled) {
        // TODO Implement a setting to activate the Debug through the editor
        return <Physics {...props}>{children}</Physics>;
    }

    return <>{children}</>;
};

export default GamePhysics;
