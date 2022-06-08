import * as THREE from "three";
import { FC, useEffect } from "react";
import { Physics } from "@react-three/cannon";
import { PerspectiveCamera, Select } from "@react-three/drei";
import Lights from "./components/Lights";
import CameraControls from "./components/CameraControls";
import Widgets from "../Widgets/Widgets";
import useKeyboardControls from "../Core/hooks/useKeyboardControls";
import useWidgetsActions from "../Widgets/hooks/useWidgetsActions";
import { off, on } from "../Core/utils/events";
import { useThree } from "@react-three/fiber";
import useWidgetsContext from "../Widgets/hooks/core/useWidgetsModuleContext";
import useWidgetsSelector from "../Widgets/hooks/core/useWidgetsSelector";
import useGetWidgets from "../Widgets/hooks/useGetWidgets";
import useWidgets from "../Widgets/hooks/useWidgets";
import useWidgetsModules from "../Widgets/hooks/useWidgetsModules";
import { saveScene, fetchScene } from "./services";
import useIsEditor from "../Editor/state/hooks/useIsEditor";

const Scene: FC = () => {
    const three = useThree();
    const { scene } = three;
    const { addWidget, addWidgetsBatch, selectWidget, removeSelected } = useWidgetsActions();
    const { getWidgetByMesh } = useGetWidgets();
    const { widgets } = useWidgets();
    const { widgetsModules } = useWidgetsModules();
    const widgetContext = useWidgetsContext();
    const { widgetsDictionary } = useWidgetsSelector();
    const { isEditor } = useIsEditor();

    useKeyboardControls();

    useEffect(() => {
        const handleFetchScene = async () => {
            await fetchScene((data: any) => {
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
            });
        };

        handleFetchScene();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [widgetsModules]);

    useEffect(() => {
        const handleSaveFile = async () => {
            await saveScene({ widgets, widgetsDictionary });
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
        <>
            <Physics isPaused={isEditor}>
                <Lights />
                <CameraControls />
                <Select box multiple onChange={onSelectMesh} filter={(items) => items}>
                    <Widgets />
                </Select>
            </Physics>
        </>
    );
};

export default Scene;
