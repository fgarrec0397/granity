import useIsEditor from "@app/Editor/_actions/hooks/useIsEditor";
import { ThreeEvent } from "@react-three/fiber";
import { getWidgetName, populateWidgetProperties } from "@widgets/_actions/utilities";
import { WidgetPhysicOptions, WidgetSceneObject } from "@widgets/_actions/widgetsTypes";
import { FC, useCallback, useRef, useState } from "react";
import { Object3D } from "three";

import { useWidgets } from "../_actions/hooks";
import usePhysic from "../_actions/hooks/usePhysic";

type Props = {
    widget: WidgetSceneObject;
};

const WidgetRenderer: FC<Props> = ({ widget }) => {
    const {
        component,
        id,
        editorOptions,
        widgetDefinition: { physic },
    } = widget;
    const Component = component;
    const [hovered, setHover] = useState(false);
    const { widgetsDictionary, getWidgetDictionaryFromWidget } = useWidgets();
    const name = getWidgetName(widget);
    const { isEditor } = useIsEditor();

    console.log(widget, "widget");

    const { shape } = physic as WidgetPhysicOptions;
    const [ref] = usePhysic(shape || "Void", () => ({ mass: 1, type: "Dynamic" })); // TODO -- putting dynamic config here makes an error

    const componentProps = useCallback(() => {
        return {
            ...populateWidgetProperties(id!, widgetsDictionary),
        };
    }, [id, widgetsDictionary]);

    const handleOnPointerOver = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(true);
    };

    const handleOnPointerOut = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(false);
    };

    const meshHolder = (
        <>{isEditor && editorOptions?.meshHolder ? editorOptions?.meshHolder : null}</>
    );

    console.log(componentProps(), "componentProps");

    return (
        <mesh
            ref={ref}
            name={name}
            onPointerOver={handleOnPointerOver}
            onPointerOut={handleOnPointerOut}
            {...getWidgetDictionaryFromWidget(id!)?.properties}
        >
            {meshHolder}

            <Component {...componentProps()} hovered={hovered} />
        </mesh>
    );
};
export default WidgetRenderer;
