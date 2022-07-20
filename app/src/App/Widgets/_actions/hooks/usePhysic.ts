import {
    Api,
    BodyProps,
    BodyShapeType,
    BoxProps,
    PlaneProps,
    useBox,
    usePlane,
} from "@react-three/cannon";
import { Object3D } from "three";

type PhysicTypes = {
    [Property in BodyShapeType]?: Api<Object3D<Event>>;
} & {
    Void?: null;
};

type GetByIndex<T extends BodyProps> = (index: number) => T;

export default <P extends BodyProps>(physicTypes: BodyShapeType, fn: GetByIndex<P>) => {
    const physic = {
        Box: useBox(fn as GetByIndex<BoxProps>),
        Plane: usePlane(fn as GetByIndex<PlaneProps>),
        Void: null,
    } as PhysicTypes;

    return physic[physicTypes] as PhysicTypes;
};
