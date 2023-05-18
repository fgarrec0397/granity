import { FC } from "react";

import {
    Physics as PhysicsProvider,
    PhysicsProps as PhysicsProviderProps,
} from "../lib/react-three-rapier";

export type PhysicsProps = PhysicsProviderProps;

const Physics: FC<PhysicsProps> = ({ children, ...props }) => {
    return <PhysicsProvider {...props}>{children}</PhysicsProvider>;
};

export default Physics;
