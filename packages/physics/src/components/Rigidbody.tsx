import { useEditor } from "@granity/engine";
import { HasChildren } from "@granity/helpers";
import { forwardRef } from "react";

import { RapierRigidBody, RigidBody, RigidBodyProps } from "../lib";

type Props = RigidBodyProps &
    HasChildren & {
        hasPhysic?: boolean;
    };

const GameRigidbody = forwardRef<RapierRigidBody, Props>(({ children, ...rigidbodyProps }, ref) => {
    const { isEditor } = useEditor();

    if (!isEditor) {
        return (
            <RigidBody {...rigidbodyProps} ref={ref}>
                {children}
            </RigidBody>
        );
    }

    return <>{children}</>;
});

GameRigidbody.displayName = "GameRigidbody";

export default GameRigidbody;
