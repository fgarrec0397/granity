import { useBox } from "@react-three/cannon";
import { FC, RefObject, useEffect } from "react";
import { Event, Object3D } from "three";

type Props = {
    getPhysicRef: (physicRef: RefObject<Object3D<Event>>) => void;
};

const PhysicBox: FC<Props> = ({ getPhysicRef }) => {
    const [ref] = useBox(() => ({ mass: 1, position: [10, 0, 0], type: "Dynamic" }));

    useEffect(() => {
        getPhysicRef(ref);
        console.log("physic box");
    }, [ref, getPhysicRef]);

    return null;
};
export default PhysicBox;
