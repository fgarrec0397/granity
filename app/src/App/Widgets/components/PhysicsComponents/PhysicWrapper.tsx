import { Api, BodyShapeType, useBox } from "@react-three/cannon";
import { ThreeEvent } from "@react-three/fiber";
import { FC, RefObject, useEffect, useLayoutEffect, useState } from "react";
import { Event, Object3D } from "three";

import { useWidgets } from "../../_actions/hooks";
import PhysicBox from "./PhysicBox";

type Props = {
    widgetName: string;
    widgetId: string;
    physicType?: BodyShapeType;
    handleOnPointerOver: (event: ThreeEvent<PointerEvent>) => void;
    handleOnPointerOut: (event: ThreeEvent<PointerEvent>) => void;
};

const PhysicWrapper: FC<Props> = ({
    widgetName,
    widgetId,
    physicType,
    handleOnPointerOver,
    handleOnPointerOut,
    children,
}) => {
    const [currentRef, setCurrentRef] = useState<Api<Object3D<Event>>>();
    const box = {
        box: useBox(() => ({ mass: 1, position: [10, 0, 0], type: "Dynamic" })),
    };

    const { getWidgetDictionaryFromWidget } = useWidgets();

    // const getPhysicRef = (physicRef: RefObject<Object3D<Event>>) => {
    //     setCurrentRef(physicRef);
    // };

    // useLayoutEffect(() => {
    //     setCurrentRef(box);
    //     console.log("physic box");
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // useEffect(() => {
    //     console.log(currentRef, "currentRef");
    // }, [currentRef]);

    return (
        <mesh
            ref={box.box[0]}
            name={widgetName}
            onPointerOver={handleOnPointerOver}
            onPointerOut={handleOnPointerOut}
            {...getWidgetDictionaryFromWidget(widgetId!)?.properties}
        >
            {/* {physicType === "Box" && <PhysicBox getPhysicRef={getPhysicRef} />} */}
            {children}
        </mesh>
    );
};

export default PhysicWrapper;
