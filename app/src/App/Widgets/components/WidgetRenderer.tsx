import { ThreeEvent } from "@react-three/fiber";
import { FC, useCallback, useRef, useState } from "react";
import { Object3D } from "three";
import { FeaturesWidgetsProps } from "../../../Features/collector";
import useWidgetsSelector from "../hooks/core/useWidgetsSelector";
import { populateWidgetProperties } from "../utilities";

type Props<T = FeaturesWidgetsProps> = {
    component: FC<T>;
    name: string;
    id: string;
};

const WidgetRenderer: FC<Props> = ({ component, name, id }) => {
    const Component = component;
    const ref = useRef<Object3D>();
    const [hovered, setHover] = useState(false);
    const { widgetsDictionary } = useWidgetsSelector();

    const componentProps = useCallback(() => {
        return {
            ...populateWidgetProperties(id, widgetsDictionary),
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

    return (
        <group
            ref={ref}
            name={name}
            onPointerOver={handleOnPointerOver}
            onPointerOut={handleOnPointerOut}
            {...widgetsDictionary[id]?.properties}
        >
            <Component {...componentProps()} hovered={hovered} />
        </group>
    );
};
export default WidgetRenderer;
