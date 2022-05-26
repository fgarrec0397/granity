import { Object3D } from "three";
import serializeVector3 from "../../../Common/utils/serializeVector3";
import uidGenerator from "../../../Common/utils/uidGenerator";
import { WidgetOptionsValues, WidgetProperties, WidgetSceneObject } from "../../types";
import useWidgetsServices from "./core/useWidgetsServices";
import useWidgetDispatch from "./core/useWidgetDispatch";
import useWidgetsSelector from "./core/useWidgetsSelector";
import useGetWidgets from "./useGetWidgets";
import useWidgets from "./useWidgets";

export default () => {
    const { currentWidgets } = useWidgets();
    const { add, update, remove, updateCurrentProperties } = useWidgetsServices();
    const { widgetsDictionary } = useWidgetsSelector();
    const { dispatchSetSelected, dispatchRemoveSelected } = useWidgetDispatch();
    const { getMeshByWidget, getWidgetByMesh } = useGetWidgets();

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

    // TODO - Wait to refactor the selection in Transformcontrols before refactoring this part.
    const selectWidget = (widget: WidgetSceneObject) => {
        dispatchSetSelected(widget);
    };

    const updateCurrentWidgetOptions = (widgetOptions: WidgetOptionsValues) => {
        const currentWidget = currentWidgets[0];

        if (currentWidget?.id) {
            update(currentWidget, undefined, widgetOptions);
        }
    };

    const updateCurrentWidget = (
        widgetProperties: WidgetProperties,
        updateOnlyProperties = false
    ) => {
        const currentWidget = currentWidgets[0];

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
        const mesh = getMeshByWidget(currentWidgets[0]);

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

    return {
        addWidget,
        selectWidget,
        updateCurrentWidget,
        updateCurrentWidgetWithMesh,
        updateCurrentWidgetOptions,
        copyWidget,
        removeCurrentWidgets,
        removeWidget,
        removeSelected,
    };
};
