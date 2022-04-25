import { useCallback, useContext, useEffect, useState } from "react";
import { Object3D } from "three";
import serializeVector3 from "../../../Common/utils/serializeVector3";
import uidGenerator from "../../../Common/utils/uidGenerator";
import { useAppDispatch, useAppSelector } from "../../../Core/store";
import { WidgetSceneObject, WidgetProperties, SerializedWidgetSceneObject } from "../../types";
import { getWidgetComponent, serializeSceneWidget, unSerializeSceneWidget } from "../../utilities";
import { WidgetsContext } from "../WidgetsProvider";
import { setCurrentWidgetProperties, setSelected, setSelectedWidgets } from "../widgetsReducer";

export default () => {
    const dispatch = useAppDispatch();
    const { selected, selectedWidgets } = useAppSelector((state) => state.widgets);
    const { widgets, setWidgets } = useContext(WidgetsContext);
    const [currentWidgetsState, setCurrentWidgetsState] = useState<WidgetSceneObject[]>([]);

    useEffect(() => {
        // TODO -- Check an optimized version to get the currents elements ---> O(n) instead of O(n^2)
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

    const addWidget = (widget: WidgetSceneObject) => {
        const newWidget = { ...widget };
        newWidget.id = uidGenerator(); // assign id on initialisation

        setWidgets([...widgets, newWidget]);
    };

    const getWidgetById = (id: string | undefined) => {
        if (id) {
            return widgets.find((x: any) => x.id === id);
        }
    };

    const selectWidget = (widget: WidgetSceneObject, isMultipleSelect: boolean) => {
        if (widget.id) {
            // const currentWidgets = widgets.filter((x) => {
            //     if (x.id) {
            //         return selected.indexOf(x.id) !== -1;
            //     }

            //     return false;
            // });
            // const serializedWidget = serializeSceneWidget(widget);
            // setCurrentWidgetsState([widget]);
            // dispatch(setSelectedWidgets([serializedWidget]));
            dispatch(setSelected({ newSelectedId: widget.id, isMultipleSelect }));
        }
    };

    const updateCurrentWidget = useCallback(
        (widgetProperties: WidgetProperties, updateOnlyProperties = false) => {
            if (!updateOnlyProperties) {
                const currentWidget = { ...selectedWidgets[0] } as SerializedWidgetSceneObject;
                const unSerializedCurrentWidget = unSerializeSceneWidget(currentWidget);

                if (unSerializedCurrentWidget) {
                    const updatedWidgets = widgets.map((x) => {
                        if (x.id !== unSerializedCurrentWidget.id) {
                            x.properties = widgetProperties;
                        }

                        return x;
                    });

                    unSerializedCurrentWidget.properties = widgetProperties;
                    currentWidget.properties = widgetProperties; // maybe from here

                    dispatch(setSelectedWidgets([currentWidget]));
                    setWidgets(updatedWidgets);
                }
            }

            dispatch(setCurrentWidgetProperties(widgetProperties));
        },
        [dispatch, selectedWidgets, setWidgets, widgets]
    );

    const updateCurrentWidgetWithMesh = useCallback(
        (mesh: Object3D | undefined, updateOnlyProperties = false) => {
            if (mesh) {
                updateCurrentWidget(
                    {
                        position: serializeVector3(mesh.position),
                        rotation: serializeVector3(mesh.rotation),
                        scale: serializeVector3(mesh.scale),
                    },
                    updateOnlyProperties
                );
            }
        },
        [updateCurrentWidget]
    );

    return {
        currentWidgets: selectedWidgets,
        firstCurrentWidget: currentWidgetsState[0],
        widgets,
        addWidget,
        getWidgetById,
        selectWidget,
        updateCurrentWidget,
        updateCurrentWidgetWithMesh,
    };
};
