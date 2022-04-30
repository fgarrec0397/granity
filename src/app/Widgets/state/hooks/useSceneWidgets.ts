import { useContext, useEffect, useState } from "react";
import { Object3D } from "three";
import uidGenerator from "../../../Common/utils/uidGenerator";
import { useAppDispatch, useAppSelector } from "../../../Core/store";
import { WidgetSceneObject } from "../../types";
import { WidgetsContext } from "../../WidgetsProvider";
import { addWidgetDictionary, removeSelected, removeWidgetDictionary } from "../widgetsReducer";
import useWidgetsUtilities from "./useWidgetsUtilities";

export default () => {
    const [meshToRemove, setMeshToRemove] = useState<Object3D | null>(null);
    const dispatch = useAppDispatch();
    const { selected, widgetsDictionary } = useAppSelector((state) => state.widgets);
    const { getMeshByWidget, getWidgetByMesh } = useWidgetsUtilities();
    const { widgets, setWidgets } = useContext(WidgetsContext);
    const [currentWidgetsState, setCurrentWidgetsState] = useState<WidgetSceneObject[]>([]);

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

    const copyWidget = (widget: WidgetSceneObject) => {
        const newWidget = { ...widget };
        const newId = uidGenerator();

        newWidget.id = newId;

        if (widget.id) {
            dispatch(
                addWidgetDictionary({
                    id: newWidget.id,
                    properties: widgetsDictionary[widget.id].properties,
                    options: widgetsDictionary[widget.id].options,
                })
            );

            setWidgets([...widgets, newWidget]);
        }
    };

    const removeCurrentWidgets = () => {
        const mesh = getMeshByWidget(currentWidgetsState[0]);

        if (mesh) {
            removeWidget(mesh);
        } else {
            // eslint-disable-next-line no-console
            console.error("No mesh found"); // Add UI confirmation
        }
    };

    const removeWidget = (mesh: Object3D) => {
        const { widget } = getWidgetByMesh(mesh);

        if (widget.id) {
            const updatedWidgets = widgets.filter(({ id }) => id !== widget.id);
            setWidgets([...updatedWidgets]);
            dispatch(removeWidgetDictionary(widget.id));
        }

        dispatch(removeSelected());
    };

    return {
        copyWidget,
        removeCurrentWidgets,
        removeWidget,
    };
};
