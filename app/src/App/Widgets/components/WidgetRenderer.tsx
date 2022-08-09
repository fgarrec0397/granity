import useIsEditor from "@app/Editor/_actions/hooks/useIsEditor";
import useGameWidgets from "@app/Game/_actions/hooks/useGameWidgets";
import { ThreeEvent } from "@react-three/fiber";
import { getWidgetName, populateWidgetProperties } from "@widgets/_actions/utilities";
import { WidgetSceneObject } from "@widgets/_actions/widgetsTypes";
import { FC, useCallback, useState } from "react";

import { useWidgets } from "../_actions/hooks";

type Props = {
    widget: WidgetSceneObject;
};

const WidgetRenderer: FC<Props> = ({ widget }) => {
    const { component, id, editorOptions } = widget;
    const Component = component;
    const [hovered, setHover] = useState(false);
    const { widgetsDictionary, getWidgetDictionaryFromWidget } = useWidgets();
    const name = getWidgetName(widget);
    const { isEditor } = useIsEditor();
    const { gameWidgetsDictionary } = useGameWidgets();

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

    const widgetProperties = isEditor ? getWidgetDictionaryFromWidget(id!)?.properties : undefined;

    return (
        <mesh
            name={name}
            onPointerOver={handleOnPointerOver}
            onPointerOut={handleOnPointerOut}
            {...widgetProperties}
            // position={isEditor ? widgetsDictionary[id]?.properties.position : undefined}
            // rotation={isEditor ? widgetsDictionary[id]?.properties.rotation : undefined}
            // scale={isEditor ? widgetsDictionary[id]?.properties.scale : undefined}
        >
            {meshHolder}

            <Component
                {...componentProps()}
                hovered={hovered}
                position={
                    isEditor
                        ? [
                              widgetsDictionary[id]?.properties.position[0],
                              widgetsDictionary[id]?.properties.position[1],
                              widgetsDictionary[id]?.properties.position[2],
                          ]
                        : [
                              gameWidgetsDictionary[id]?.properties.position[0],
                              gameWidgetsDictionary[id]?.properties.position[1],
                              gameWidgetsDictionary[id]?.properties.position[2],
                          ]
                }
                rotation={
                    isEditor
                        ? [
                              widgetsDictionary[id]?.properties.rotation[0],
                              widgetsDictionary[id]?.properties.rotation[1],
                              widgetsDictionary[id]?.properties.rotation[2],
                          ]
                        : [
                              gameWidgetsDictionary[id]?.properties.rotation[0],
                              gameWidgetsDictionary[id]?.properties.rotation[1],
                              gameWidgetsDictionary[id]?.properties.rotation[2],
                          ]
                }
                scale={
                    isEditor
                        ? [
                              widgetsDictionary[id]?.properties.scale[0],
                              widgetsDictionary[id]?.properties.scale[1],
                              widgetsDictionary[id]?.properties.scale[2],
                          ]
                        : [
                              gameWidgetsDictionary[id]?.properties.scale[0],
                              gameWidgetsDictionary[id]?.properties.scale[1],
                              gameWidgetsDictionary[id]?.properties.scale[2],
                          ]
                }
            />
        </mesh>
    );
};
export default WidgetRenderer;
