import * as THREE from "three";
import { FC, useEffect } from "react";
import { Physics } from "@react-three/cannon";
import { Select } from "@react-three/drei";
import Lights from "./components/Lights";
import CameraControls from "./components/CameraControls";
import Widgets from "../Widgets/Widgets";
import useKeyboardControls from "../Core/hooks/useKeyboardControls";
import useWidgetsActions from "../Widgets/state/hooks/useWidgetsActions";
import { off, on } from "../Core/utils/events";
import { useThree } from "@react-three/fiber";
import { WidgetSceneObject } from "../Widgets/types";
import useWidgetsContext from "../Widgets/state/hooks/core/useWidgetsModuleContext";
import useWidgetsSelector from "../Widgets/state/hooks/core/useWidgetsSelector";
import { SetOptionalPropertyFrom } from "../Common/utils/typings";
import useGetWidgets from "../Widgets/state/hooks/useGetWidgets";
import useWidgets from "../Widgets/state/hooks/useWidgets";
import useWidgetsModules from "../Widgets/state/hooks/useWidgetsModules";

const Scene: FC = () => {
    const { scene } = useThree();
    const { addWidget, addWidgetsBatch, selectWidget, removeSelected } = useWidgetsActions();
    const { getWidgetByMesh } = useGetWidgets();
    const { widgets } = useWidgets();
    const { widgetsModules } = useWidgetsModules();
    const widgetContext = useWidgetsContext();
    const { widgetsDictionary } = useWidgetsSelector();

    useKeyboardControls();

    useEffect(() => {
        const fetchScene = async () => {
            const response = await fetch("api/scene");

            try {
                const { sceneJsonString } = await response.json();
                const data = JSON.parse(sceneJsonString);

                const fetchedWidgets = data.preparedWidgets.map((x: any) => {
                    const component = widgetsModules.find(
                        (y) => y.widgetDefinition.name === x.widgetDefinition.name
                    )?.component;

                    return {
                        ...x,
                        component,
                    };
                });

                addWidgetsBatch(data.widgetsDictionary, fetchedWidgets);
            } catch (error) {
                console.error(error, "error");
            }
        };

        fetchScene();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [widgetsModules]);

    useEffect(() => {
        const handleSaveFile = async () => {
            const clonedWidgets: SetOptionalPropertyFrom<WidgetSceneObject, "component">[] = [
                ...widgets,
            ];
            const preparedWidgets = clonedWidgets.map((x) => {
                const clonedWidget = { ...x };
                delete clonedWidget.component; // Problem here
                return clonedWidget;
            });

            const widgetsDefinition = { preparedWidgets, widgetsDictionary };

            const rawResponse = await fetch("api/scene", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(widgetsDefinition),
            });

            try {
                const data = await rawResponse.json();
            } catch (error) {
                console.error(error, "error");
            }
        };

        on("saveFile:click", handleSaveFile);

        return () => {
            off("saveFile:click", handleSaveFile);
        };
    }, [scene, widgets, widgetContext, widgetsDictionary, widgetsModules, addWidgetsBatch]);

    useEffect(() => {
        const handleAddWidget = ({ detail }: any) => {
            addWidget(detail);
        };

        const handleRemoveSelected = () => {
            removeSelected();
        };

        on("onClick:addWidget", handleAddWidget);
        on("onPointerMissed:removeSelected", handleRemoveSelected);

        return () => {
            off("onPointerMissed:removeSelected", handleRemoveSelected);
            off("onClick:addWidget", handleAddWidget);
        };
    }, [addWidget, removeSelected]);

    const onSelectMesh = (meshArray: THREE.Object3D[]) => {
        if (meshArray.length) {
            const { widget } = getWidgetByMesh(meshArray[0]);

            if (widget) {
                selectWidget(widget);
            }
        }
    };

    return (
        <Physics>
            <Lights />
            <CameraControls />
            <Select box multiple onChange={onSelectMesh} filter={(items) => items}>
                <Widgets />
            </Select>
        </Physics>
    );
};

export default Scene;
