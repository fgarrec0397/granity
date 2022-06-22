import { ThreeEvent } from "@react-three/fiber";
import { FC, useCallback, useRef, useState } from "react";
import { Object3D } from "three";
import useIsEditor from "@editor/hooks/useIsEditor";
import useWidgetsSelector from "@widgets/_actions/_data/hooks/useWidgetsSelector";
import { WidgetSceneObject } from "@widgets/_actions/widgetsTypes";
import { getWidgetName, populateWidgetProperties } from "@widgets/_actions/utilities";

type Props = {
    widget: WidgetSceneObject;
};

const WidgetRenderer: FC<Props> = ({ widget }) => {
    const { component, id, editorOptions } = widget;
    const Component = component;
    const ref = useRef<Object3D>();
    const [hovered, setHover] = useState(false);
    const { widgetsDictionary } = useWidgetsSelector();
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

    return (
        <mesh
            ref={ref}
            name={name}
            onPointerOver={handleOnPointerOver}
            onPointerOut={handleOnPointerOut}
            {...widgetsDictionary[id!]?.properties}
        >
            {meshHolder}

            <Component {...componentProps()} hovered={hovered} />
        </mesh>
    );
};
export default WidgetRenderer;
