import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { useThree } from "@react-three/fiber";
import React, { FC, useEffect, useState } from "react";
import { Group, Object3D } from "three";
import useCurrentMode from "../../Editor/state/hooks/useCurrentMode";
import useIsEditing from "../../Editor/state/hooks/useIsEditing";
import useWidgets from "../../Widgets/state/hooks/useWidgets";
import useWidgetsUtilities from "../../Widgets/state/hooks/useWidgetsUtilities";
import useTimer from "../../Common/hooks/useTimer";

const TransformControlsComponent: FC = ({ children }) => {
    const { mouse, camera, raycaster, scene, gl } = useThree();
    const { getWidgetByMesh, getMeshByWidget } = useWidgetsUtilities();
    const { currentWidgets, firstCurrentWidget, selectWidget, updateCurrentWidgetWithMesh } =
        useWidgets();
    const { currentMode } = useCurrentMode();
    const { setIsEditing, isEditing } = useIsEditing();
    const [transformControl, setTransformControl] = useState<TransformControls>();
    const [stateMesh, setStateMesh] = useState<Object3D>();
    const [temporaryGroup, setTemporaryGroup] = useState<Group>();
    const { startTimer, stopTimer, seconds } = useTimer();

    useEffect(() => {
        console.log(scene.children, "scene.children");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scene.children.length]);

    useEffect(() => {
        console.log(stateMesh, "stateMesh");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateMesh]);

    useEffect(() => {
        // if (!transformControl && currentWidgets.length) {
        if (!transformControl && stateMesh) {
            console.log("set transformcontrol");

            const transformC = new TransformControls(camera, gl.domElement);
            const mesh = getMeshByWidget(currentWidgets[0]);

            // if (mesh) {
            // transformC.attach(mesh);
            transformC.attach(stateMesh);
            transformC.setMode(currentMode);

            scene.add(transformC);
            setTransformControl(transformC);
            // }
        }

        return () => {
            if (transformControl) {
                console.log("unmount transformcontrols");

                scene.remove(transformControl);
                setTransformControl(undefined);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        transformControl,
        camera,
        scene,
        gl,
        // getMeshByWidget,
        // currentMode,
        // currentWidgets.length,
        stateMesh,
        // firstCurrentWidget?.id,
    ]);

    useEffect(() => {
        if (currentWidgets.length) {
            setStateMesh(getMeshByWidget(currentWidgets[0]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWidgets.length, firstCurrentWidget?.id, getMeshByWidget]);

    /**
     * Initialize mouse up events
     */
    useEffect(() => {
        const onMouseDown = (event: MouseEvent) => {
            event.preventDefault();
            // TODO -- Check if timer is necessary.Pay attention, it re-render each time a second is updated
            // startTimer();
            // TODO -- when a widget is released below another widget, it selects the above widget
        };

        const onMouseUp = (event: MouseEvent): void => {
            event.preventDefault();
            // stopTimer();

            if (seconds < 2) {
                const isMultipleSelect = event.ctrlKey;

                raycaster.setFromCamera(mouse, camera);

                const intersects = raycaster.intersectObjects(scene.children, true);

                if (intersects.length > 0) {
                    const [closestMesh] = intersects
                        .filter((x) => x.object?.type === "Mesh")
                        .sort((x: any) => x.distance);

                    if (closestMesh) {
                        const { widget } = getWidgetByMesh(closestMesh.object);

                        if (widget) {
                            selectWidget(widget, isMultipleSelect);
                        }
                    }
                } else if (temporaryGroup && !isEditing) {
                    const grouppedMeshes: Object3D[] = [];

                    temporaryGroup.children.forEach((child) => {
                        if (child) {
                            grouppedMeshes.push(child);
                            scene.remove(child);
                        }
                    });

                    grouppedMeshes.forEach((mesh) => {
                        scene.attach(mesh);
                    });

                    setTemporaryGroup(undefined);
                    scene.remove(temporaryGroup);
                }
            } else {
                // eslint-disable-next-line no-useless-return
                return;
            }
        };

        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("mousedown", onMouseDown);

        return () => {
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("mousedown", onMouseDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        camera,
        getWidgetByMesh,
        isEditing,
        mouse,
        raycaster,
        scene,
        selectWidget,
        startTimer,
        temporaryGroup,
    ]);

    /**
     * Detach the transformControl whenever the current element change
     */
    useEffect(() => {
        if (transformControl) {
            transformControl.detach();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWidgets.length, currentWidgets[0]?.id, temporaryGroup]);

    /**
     * Initialize events on transformControls.
     * Updated each time elementsOnScene is modified to keep the state updated
     */
    useEffect(() => {
        const onTransformControlMouseUp = () => {
            // const mesh = getMeshByWidget(currentWidgets[0]);

            if (stateMesh) {
                updateCurrentWidgetWithMesh(stateMesh); // the proble comes from this function
            }
        };

        const onDraggingChangedHandler = ({ value }: any) => {
            setIsEditing(value);
        };

        const onObjectChangeHandler = () => {
            // const mesh = getMeshByWidget(currentWidgets[0]);
            updateCurrentWidgetWithMesh(stateMesh, true);
        };

        transformControl?.addEventListener("mouseUp", onTransformControlMouseUp);
        transformControl?.addEventListener("dragging-changed", onDraggingChangedHandler);
        transformControl?.addEventListener("objectChange", onObjectChangeHandler);

        return () => {
            transformControl?.removeEventListener("mouseUp", onTransformControlMouseUp);
            transformControl?.removeEventListener("dragging-changed", onDraggingChangedHandler);
            transformControl?.removeEventListener("objectChange", onObjectChangeHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        transformControl,
        // currentWidgets.length,
        // currentWidgets,
        // getMeshByWidget,
        stateMesh,
        updateCurrentWidgetWithMesh,
        setIsEditing,
    ]);

    return <>{children}</>;
};

export default TransformControlsComponent;
