import useEditor from "@app/Editor/_actions/hooks/useEditor";
import { RigidBody, RigidBodyApi, RigidBodyProps } from "@react-three/rapier";
import { HasChildren } from "helpers-granity";
import { forwardRef } from "react";

type Props = RigidBodyProps &
    HasChildren & {
        hasPhysic?: boolean;
    };

const GameRigidbody = forwardRef<RigidBodyApi, Props>(({ children, ...rigidbodyProps }, ref) => {
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
