import { HasChildren } from "@granity/helpers";
import { forwardRef } from "react";

import { RapierRigidBody, RigidBody, RigidBodyProps } from "../lib/react-three-rapier";

export type GameRigidBodyProps = RigidBodyProps &
    HasChildren & {
        hasPhysic?: boolean;
    };

const GameRigidbody = forwardRef<RapierRigidBody, GameRigidBodyProps>(
    ({ children, ...rigidbodyProps }, ref) => {
        return (
            <RigidBody {...rigidbodyProps} ref={ref}>
                {children}
            </RigidBody>
        );
    }
);

GameRigidbody.displayName = "GameRigidbody";

export default GameRigidbody;
