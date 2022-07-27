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

type PhysicShape = {
    [Property in BodyShapeType]?: Api<Object3D<Event>>;
} & {
    Void?: [null];
};

type GetByIndex<T extends BodyProps> = (index: number) => T;

export default <P extends BodyProps>(
    physicTypes: BodyShapeType | "Void",
    fn: GetByIndex<P>
): Api<Object3D<Event>> => {
    const physic = {
        Box: useBox(fn as GetByIndex<BoxProps>),
        Plane: usePlane(fn as GetByIndex<PlaneProps>),
        Void: [null],
    } as PhysicShape;

    return physic[physicTypes] as Api<Object3D<Event>>;
};
