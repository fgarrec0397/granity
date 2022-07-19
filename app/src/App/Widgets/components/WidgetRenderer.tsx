import useIsEditor from "@app/Editor/_actions/hooks/useIsEditor";
import { ThreeEvent } from "@react-three/fiber";
import { getWidgetName, populateWidgetProperties } from "@widgets/_actions/utilities";
import { WidgetSceneObject } from "@widgets/_actions/widgetsTypes";
import { FC, useCallback, useRef, useState } from "react";
import { Object3D } from "three";

import { useWidgets } from "../_actions/hooks";
import usePhysic from "../_actions/hooks/usePhysic";

type Props = {
    widget: WidgetSceneObject;
};

const WidgetRenderer: FC<Props> = ({ widget }) => {
    const { component, id, editorOptions } = widget;
    const Component = component;
    // const ref = useRef<Object3D>();
    const [hovered, setHover] = useState(false);
    const { widgetsDictionary, getWidgetDictionaryFromWidget } = useWidgets();
    const name = getWidgetName(widget);
    const { isEditor } = useIsEditor();
    // const physic = usePhysic(); // TODO -- return the ref from this hook

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

    return (
        <mesh
            // ref={ref}
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
