import useIsEditor from "@app/Editor/_actions/hooks/useIsEditor";
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

    const widgetProperties = getWidgetDictionaryFromWidget(id!)?.properties;

    return (
        <mesh
            name={name}
            onPointerOver={handleOnPointerOver}
            onPointerOut={handleOnPointerOut}
            {...widgetProperties}
        >
            {meshHolder}

            <Component {...componentProps()} hovered={hovered} />
        </mesh>
    );
};
export default WidgetRenderer;
