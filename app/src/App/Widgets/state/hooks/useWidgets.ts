import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Object3D } from "three";
import serializeVector3 from "../../../Common/utils/serializeVector3";
import uidGenerator from "../../../Common/utils/uidGenerator";
import constants from "../../../Core/constants";
import { useAppDispatch, useAppSelector } from "../../../Core/store";
import {
    UseWidgetsHook,
    WidgetModule,
    WidgetOptionsValues,
    WidgetProperties,
    WidgetSceneObject,
} from "../../types";
import { getWidgetName } from "../../utilities";
import { setSelected } from "../widgetsReducer";
import useSceneWidgetsContext from "./core/useSceneWidgetsContext";
import useWidgetActions from "./core/useWidgetActions";
import useWidgetDispatch from "./core/useWidgetDispatch";
import useWidgetsSelector from "./core/useWidgetsSelector";

const {
    widget: { widgetObjectsPrefix },
} = constants;

// export default <T>(): UseWidgetsHook<T> => { // TODO - try to make this typing works
export default () => {
    const { scene } = useThree();
    const dispatch = useAppDispatch();
    const { selected, currentWidgetProperties } = useAppSelector((state) => state.widgets);
    const { add, update, remove, updateCurrentProperties } = useWidgetActions();
    const { widgets } = useSceneWidgetsContext();
    const { widgetsDictionary } = useWidgetsSelector();
    const { dispatchRemoveSelected } = useWidgetDispatch();
    const [currentWidgetsState, setCurrentWidgetsState] = useState<WidgetSceneObject[]>([]);

    useEffect(() => {
        // TODO -- Check an optimized version to get the current widgets ---> O(n) instead of O(n^2)
        const currentWidgets = widgets.filter((x) => {
            if (x.id) {
                return selected.indexOf(x.id) !== -1;
            }

            return false;
        });

        setCurrentWidgetsState(currentWidgets);
    }, [selected, widgets]);

    const addWidget = (widget: WidgetSceneObject) => {
        const newWidget = { ...widget };
        newWidget.id = uidGenerator(); // assign id on initialisation

        const defaultProperties: WidgetProperties = {
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
        };

        const defaultOptions: WidgetOptionsValues | Record<string, never> = {};

        if (newWidget.widgetDefinition.options?.length) {
            for (const option of newWidget.widgetDefinition.options) {
                defaultOptions[option.name] = {
                    fieldType: option.fieldType,
                    value: option.defaultValue,
                };
            }
        }

        add(newWidget, defaultProperties, defaultOptions);
    };

    const getWidgetById = (id: string | undefined) => {
        if (id) {
            return widgets.find((x) => x.id === id);
        }
    };

    // TODO - Wait to refactor the selection in Transformcontrols before refactoring this part.
    const selectWidget = (widget: WidgetSceneObject) => {
        if (widget.id) {
            dispatch(setSelected({ newSelectedId: widget.id }));
        }
    };

    const updateCurrentWidgetOptions = (widgetOptions: WidgetOptionsValues) => {
        const currentWidget = currentWidgetsState[0];

        if (currentWidget?.id) {
            update(currentWidget, undefined, widgetOptions);
        }
    };

    const updateCurrentWidget = (
        widgetProperties: WidgetProperties,
        updateOnlyProperties = false
    ) => {
        const currentWidget = currentWidgetsState[0];

        if (currentWidget?.id) {
            if (updateOnlyProperties) {
                updateCurrentProperties(widgetProperties);
            } else {
                update(currentWidget, widgetProperties);
            }
        }
    };

    const updateCurrentWidgetWithMesh = (
        mesh: Object3D | undefined,
        updateOnlyProperties = false
    ) => {
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
    };

    const copyWidget = (widget: WidgetSceneObject) => {
        const newWidget = { ...widget };
        const newId = uidGenerator();

        newWidget.id = newId;

        if (widget.id) {
            add(
                newWidget,
                widgetsDictionary[widget.id].properties,
                widgetsDictionary[widget.id].options
            );
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
            remove(widget);
        }
    };

    const removeSelected = () => {
        dispatchRemoveSelected();
    };

    const getWidgetByMesh = (mesh: Object3D) => {
        let widgetMesh: Object3D | undefined;

        if (mesh.name.startsWith(widgetObjectsPrefix)) {
            widgetMesh = mesh;
        } else {
            mesh.traverseAncestors((object) => {
                if (object.name.startsWith(widgetObjectsPrefix)) {
                    widgetMesh = object;
                }
            });
        }

        const widgetIdInMesh = widgetMesh?.name.split("+")[2];
        const widget = getWidgetById(widgetIdInMesh) as WidgetSceneObject;

        return { widget, widgetMesh };
    };

    const getMeshByWidget = (widget: WidgetModule | WidgetSceneObject) => {
        const meshName = getWidgetName(widget);
        return scene.getObjectByName(meshName);
    };

    return {
        currentWidgets: currentWidgetsState,
        firstCurrentWidget: currentWidgetsState[0], // TODO - Remove this
        currentWidgetProperties,
        widgets,
        addWidget,
        getWidgetById,
        selectWidget,
        updateCurrentWidget,
        updateCurrentWidgetWithMesh,
        updateCurrentWidgetOptions,
        copyWidget,
        removeCurrentWidgets,
        removeWidget,
        removeSelected,
        getWidgetByMesh,
        getMeshByWidget,
    };
};
