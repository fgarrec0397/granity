import { HasChildren } from "@granity/helpers";
import { forwardRef } from "react";

import {
    RapierRigidBody,
    RigidBody as LibRigidBody,
    RigidBodyProps as LibRigidBodyProps,
} from "../lib/react-three-rapier";

export type RigidBodyRefType = RapierRigidBody;

export type RigidBodyProps = LibRigidBodyProps &
    HasChildren & {
        hasPhysic?: boolean;
    };

const RigidBody = forwardRef<RigidBodyRefType, LibRigidBodyProps>(
    ({ children, ...RigidBodyProps }, ref) => {
        return (
            <LibRigidBody {...RigidBodyProps} ref={ref}>
                {children}
            </LibRigidBody>
        );
    }
);

RigidBody.displayName = "RigidBody";

export default RigidBody;
