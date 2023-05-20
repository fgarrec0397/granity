import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import { RigidBody, RigidBodyProps, RigidBodyRef } from "@granity/physics";
import { FC, forwardRef } from "react";

type Props = RigidBodyProps;

const GameRigidBody: FC<Props> = forwardRef<RigidBodyRef, RigidBodyProps>(
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
