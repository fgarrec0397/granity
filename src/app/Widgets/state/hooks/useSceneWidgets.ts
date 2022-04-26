import { useContext, useEffect, useState } from "react";
import { Object3D } from "three";
import { useAppDispatch, useAppSelector } from "../../../Core/store";
import { WidgetSceneObject } from "../../types";
import { WidgetsContext } from "../WidgetsProvider";
import { removeSelected } from "../widgetsReducer";
import useWidgetsUtilities from "./useWidgetsUtilities";

export default () => {
    const [meshToRemove, setMeshToRemove] = useState<Object3D | null>(null);
    const dispatch = useAppDispatch();
    const { selected } = useAppSelector((state) => state.widgets);
    const { getMeshByWidget, getWidgetByMesh } = useWidgetsUtilities();
    const { widgets, setWidgets } = useContext(WidgetsContext);
    const [currentWidgetsState, setCurrentWidgetsState] = useState<WidgetSceneObject[]>([]);

    useEffect(() => {
        console.log(widgets, "widgets");
    }, [widgets]);

    useEffect(() => {
        console.log(selected, "selected");
    }, [selected]);

    useEffect(() => {
        if (meshToRemove) {
            const { widget } = getWidgetByMesh(meshToRemove);

            if (widget) {
                const updatedWidgets = widgets.filter(({ id }) => id !== widget.id);

                setWidgets([...updatedWidgets]);
                setMeshToRemove(null);
            }
        }
    }, [getWidgetByMesh, meshToRemove, setWidgets, widgets]);

    useEffect(() => {
        const currentWidgets = widgets.filter((x) => {
            if (x.id) {
                return selected.indexOf(x.id) !== -1;
            }

            return false;
        });

        setCurrentWidgetsState(currentWidgets);
    }, [selected, widgets]);

    // Force rerender when widgets is updated. Should at least be for the first widget renderer
    const [, setWidgetsState] = useState<any>([]);
    useEffect(() => {
        setWidgetsState(widgets);
    }, [widgets, widgets.length]);

    const copyWidget = (widget: WidgetSceneObject) => {};

    const removeCurrentWidgets = () => {
        const mesh = getMeshByWidget(currentWidgetsState[0]);

        if (mesh) {
            removeWidget(mesh);
        } else {
            console.error("No mesh found"); // Add UI confirmation
        }
    };

    const removeWidget = (mesh: Object3D) => {
        const { widget } = getWidgetByMesh(mesh);

        if (widget) {
            const updatedWidgets = widgets.filter(({ id }) => id !== widget.id);
            setWidgets([...updatedWidgets]);
        }

        dispatch(removeSelected());
    };

    return {
        copyWidget,
        removeCurrentWidgets,
        removeWidget,
    };
};
