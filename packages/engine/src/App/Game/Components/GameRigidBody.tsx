import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import { RigidBody, RigidBodyProps, RigidBodyRefType } from "@granity/physics";
import { forwardRef } from "react";

const GameRigidBody = forwardRef<RigidBodyRefType, RigidBodyProps>(
    ({ children, ...props }, ref) => {
        const { physicsEnabled } = useConfig();

        if (physicsEnabled) {
            return (
                <RigidBody ref={ref} {...props}>
                    {children}
                </RigidBody>
            );
        }

        return <>{children}</>;
    }
);

GameRigidBody.displayName = "GameRigidBody";

export default GameRigidBody;
