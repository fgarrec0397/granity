import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { useThree } from "@react-three/fiber";
import React, { FC, useEffect, useState } from "react";
import { Group, Object3D } from "three";
import useCurrentMode from "../../Editor/state/hooks/useCurrentMode";
import useIsEditing from "../../Editor/state/hooks/useIsEditing";
import useWidgets from "../../Widgets/state/hooks/useWidgets";
import useWidgetsUtilities from "../../Widgets/state/hooks/useWidgetsUtilities";

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

    useEffect(() => {
        if (!transformControl && stateMesh) {
            const transformC = new TransformControls(camera, gl.domElement);

            transformC.attach(stateMesh);
            transformC.setMode(currentMode);

            scene.add(transformC);
            setTransformControl(transformC);
        }

        return () => {
            if (transformControl) {
                scene.remove(transformControl);
                setTransformControl(undefined);
            }
        };
    }, [transformControl, camera, scene, gl, stateMesh, currentMode]);

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
        // TODO -- when a widget is released below another widget, it selects the above widget
        const onMouseUp = (event: MouseEvent): void => {
            event.preventDefault();

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
        };

        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [camera, getWidgetByMesh, isEditing, mouse, raycaster, scene, selectWidget, temporaryGroup]);

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
            if (stateMesh) {
                updateCurrentWidgetWithMesh(stateMesh); // the proble comes from this function
            }
        };

        const onDraggingChangedHandler = ({ value }: any) => {
            setIsEditing(value);
        };

        const onObjectChangeHandler = () => {
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
    }, [transformControl, stateMesh, updateCurrentWidgetWithMesh, setIsEditing]);

    return <>{children}</>;
};

export default TransformControlsComponent;
