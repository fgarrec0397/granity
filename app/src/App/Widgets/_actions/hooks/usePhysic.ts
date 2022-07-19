import { Api, BodyShapeType, useBox } from "@react-three/cannon";
import { Object3D } from "three";

type PhysicTypes = {
    [Property in BodyShapeType]?: Api<Object3D<Event>>;
};

export default (physicTypes: BodyShapeType) => {
    const physic = {
        Box: useBox(() => ({ mass: 1, position: [10, 0, 0], type: "Dynamic" })),
    } as PhysicTypes;

    return physic[physicTypes] as PhysicTypes;
};
