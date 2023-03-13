import useEditor from "@granity/engine/App/Editor/_actions/hooks/useEditor";
import useEditorHelper from "@granity/engine/App/Editor/_actions/hooks/useEditorHelper";
import getWidgetName from "@granity/engine/App/Widgets/_actions/utilities/getWidgetName";
import { WidgetObjectsDictionaryItem } from "@granity/engine/App/Widgets/_actions/widgetsTypes";
import { ThreeEvent } from "@react-three/fiber";
import { FC, MutableRefObject, useRef, useState } from "react";
import { Object3D } from "three";

import { useGetMeshByWidget } from "../../_actions/hooks";
import useWidgets from "../../_actions/hooks/useWidgets";
import useWidgetsUtilities from "../../_actions/hooks/useWidgetsUtilities";
import resolveHelper from "../../_actions/utilities/resolveHelper";
import WidgetsGizmo from "../WidgetsCommon/WidgetsGizmo";

type Props = {
    widget: WidgetObjectsDictionaryItem;
};

const WidgetObjectRenderer: FC<Props> = ({ widget }) => {
    const componentRef = useRef(null!);
    const [hovered, setHover] = useState(false);
    const {
        getWidgetDictionaryFromWidget,
        widgetsObjectInfoDictionary,
        widgetsObjects,
        displayWidgetName,
        selectWidget,
    } = useWidgets();
    const { getWidgetProps } = useWidgetsUtilities();
    const getMeshByWidget = useGetMeshByWidget();
    const { isEditor } = useEditor();
    const { component, id, editorOptions, hasRef } = widget;
    const name = getWidgetName(widget);
    const Component = component;

    const helper =
        typeof editorOptions?.helper === "function"
            ? editorOptions?.helper(widgetsObjectInfoDictionary[id].options)
            : editorOptions?.helper;

    const resolvedHelper = resolveHelper(helper);

    useEditorHelper(resolvedHelper && (componentRef as MutableRefObject<Object3D>), resolvedHelper);

    if (widgetsObjectInfoDictionary[id].isVisible !== undefined) {
        const mesh = getMeshByWidget(widgetsObjects[id]);
        const { isVisible } = widgetsObjectInfoDictionary[id];

        if (mesh) {
            mesh.visible = Boolean(isVisible); // Casting to boolean because we are sure it's not undefined
        }
    }

    const widgetProps = getWidgetProps(id);

    const handleOnPointerOver = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(true);
    };

    const handleOnPointerOut = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(false);
    };

    const gizmo = editorOptions?.gizmo;

    const resolveGizmoText = () => {
        if (typeof gizmo === "undefined" || typeof gizmo === "boolean") {
            return displayWidgetName(id) || widget.name;
        }

        return gizmo.text;
    };

    const widgetProperties = getWidgetDictionaryFromWidget(id!)?.properties;

    const onGizmoClick = () => {
        selectWidget([widgetsObjects[id]]);
    };

    const ref =
        hasRef || editorOptions?.helper
            ? {
                  ref: componentRef,
              }
            : {};

    return (
        <mesh
            name={name}
            onPointerOver={handleOnPointerOver}
            onPointerOut={handleOnPointerOut}
            {...widgetProperties}
        >
            {isEditor && gizmo && <WidgetsGizmo text={resolveGizmoText()} onClick={onGizmoClick} />}

            <Component {...widgetProps} {...widgetProperties} hovered={hovered} {...ref} />
        </mesh>
    );
};
export default WidgetObjectRenderer;
