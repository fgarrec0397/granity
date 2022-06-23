import useIsEditor from "@app/Editor/_actions/hooks/useIsEditor";
import useKeyboardControls from "@core/hooks/useKeyboardControls";
import { deserialize } from "@core/utilities/componentSerializer";
import { off, on } from "@core/utilities/events";
import { Physics } from "@react-three/cannon";
import { Select } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import useWidgetsContext from "@widgets/_actions/_data/hooks/useWidgetsModuleContext"; // TODO -- Should not be imported straight from _data
import useWidgetsSelector from "@widgets/_actions/_data/hooks/useWidgetsSelector"; // TODO -- Should not be imported straight from _data
import useGetWidgets from "@widgets/_actions/hooks/useGetWidgets";
import useWidgetsModules from "@widgets/_actions/hooks/useInitWidgetsModules";
import useWidgets from "@widgets/_actions/hooks/useWidgets";
import useWidgetsActions from "@widgets/_actions/hooks/useWidgetsActions";
import Widgets from "@widgets/Widgets";
import { FC, useEffect } from "react";
import * as THREE from "three";

import { fetchScene, saveScene } from "./_actions/_data/services"; // TODO need services. Should not be imported straight from _data
import Lights from "./components/Lights";
import SceneDefaultCamera from "./components/SceneDefaultCamera";

const Scene: FC = () => {
    const { scene } = useThree();
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
                const fetchedWidgets = data.serializedWidgets.map((x: any) => {
                    const component = widgetsModules.find(
                        (y) => y.widgetDefinition.name === x.widgetDefinition.name
                    )?.component;

                    if (x.editorOptions?.meshHolder) {
                        x.editorOptions.meshHolder = deserialize(x.editorOptions.meshHolder);
                    }

                    return {
                        ...x,
                        component,
                    };
                });

                addWidgetsBatch(data.widgetsDictionary, fetchedWidgets);
            });
        };

        handleFetchScene();
    }, [addWidgetsBatch, widgetsModules]);

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
                <SceneDefaultCamera />
                <Select box multiple onChange={onSelectMesh}>
                    <Widgets />
                </Select>
            </Physics>
        </>
    );
};

export default Scene;
