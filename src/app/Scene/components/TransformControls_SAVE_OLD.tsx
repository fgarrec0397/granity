import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { useThree } from "@react-three/fiber";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Group, Object3D } from "three";
import useCurrentMode from "../../Editor/state/hooks/useCurrentMode";
import useIsEditing from "../../Editor/state/hooks/useIsEditing";
import serializeVector3 from "../../Common/utils/serializeVector3";
import useWidgets from "../../Widgets/state/hooks/useWidgets";
import useWidgetsUtilities from "../../Widgets/state/hooks/useWidgetsUtilities";
import { useAppSelector } from "../../Core/store";

const TransformControlsComponent: FC = ({ children }) => {
    const { mouse, camera, raycaster, scene, gl } = useThree();
    const { getWidgetByMesh, getMeshByWidget } = useWidgetsUtilities();
    const {
        currentWidgets,
        firstCurrentWidget,
        selectWidget,
        updateCurrentWidgetWithMesh,
        widgets,
    } = useWidgets();
    const { currentMode } = useCurrentMode();
    const { setIsEditing, isEditing } = useIsEditing();
    const [transformControl, setTransformControl] = useState<TransformControls>();
    const [stateMesh, setStateMesh] = useState<Object3D>();
    const [temporaryGroup, setTemporaryGroup] = useState<Group>();
    const { selected } = useAppSelector((state) => state.widgets);

    /**
     * Raycast the closest element and select it as the current element
     * @param event
     */
    const onMouseUp = useCallback(
        (event: MouseEvent): void => {
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
        },
        [camera, getWidgetByMesh, isEditing, mouse, raycaster, scene, selectWidget, temporaryGroup]
    );

    /**
     * Change isEditing value based on the dragging-changed event
     * @param event
     */
    const onDraggingChangedHandler = useCallback(
        ({ value }: any) => {
            setIsEditing(value);
        },
        [setIsEditing]
    );

    /**
     * Update the whole WidgetScene object when a pointer (mouse/touch) is no longer active.
     */
    const onTransformControlMouseUp = useCallback(() => {
        updateCurrentWidgetWithMesh(stateMesh);
    }, [stateMesh, updateCurrentWidgetWithMesh]);

    /**
     * Update only the properties of the current widget based on the mesh properties
     */
    const onObjectChangeHandler = useCallback(() => {
        updateCurrentWidgetWithMesh(stateMesh, true);
    }, [stateMesh, updateCurrentWidgetWithMesh]);

    /**
     * Instantiate TransformControls class, attach a mesh and add it to the scene
     */
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
        if (currentWidgets.length > 1 && transformControl) {
            const group = new Group();

            currentWidgets.forEach((x) => {
                const mesh = getMeshByWidget(x);
                if (mesh) {
                    group.add(mesh);
                }
            });

            setTemporaryGroup(group);
            scene.add(group);
            setStateMesh(group);
        } else if (currentWidgets.length > 0) {
            setStateMesh(getMeshByWidget(currentWidgets[0]));
        }
    }, [currentWidgets, getMeshByWidget, scene, transformControl]);

    /**
     * Initialize mouse up events
     */
    useEffect(() => {
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [onMouseUp]);

    /**
     * Initialize events on transformControls.
     * Updated each time elementsOnScene is modified to keep the state updated
     */
    useEffect(() => {
        transformControl?.addEventListener("mouseUp", onTransformControlMouseUp);
        transformControl?.addEventListener("dragging-changed", onDraggingChangedHandler);
        transformControl?.addEventListener("objectChange", onObjectChangeHandler);

        return () => {
            transformControl?.removeEventListener("mouseUp", onTransformControlMouseUp);
            transformControl?.removeEventListener("dragging-changed", onDraggingChangedHandler);
            transformControl?.removeEventListener("objectChange", onObjectChangeHandler);
        };
    }, [
        transformControl,
        onTransformControlMouseUp,
        onDraggingChangedHandler,
        onObjectChangeHandler,
    ]);

    /**
     * Detach the transformControl whenever the current element change
     */
    useEffect(() => {
        if (transformControl) {
            transformControl.detach();
        }
    }, [currentWidgets.length, firstCurrentWidget?.id, temporaryGroup, transformControl]);

    /**
     * If there's no selected widgets, remove the mesh in stateMesh
     */
    useEffect(() => {
        if (!selected.length) {
            setStateMesh(undefined);
        }
    }, [selected]);

    /**
     * Update the transformControl mode when the currentMode changes
     */
    useEffect(() => {
        if (transformControl) {
            transformControl.setMode(currentMode);
        }
    }, [currentMode, transformControl]);

    useEffect(() => {
        if (stateMesh) {
            updateCurrentWidgetWithMesh(stateMesh);
        }
    }, [selected, stateMesh, updateCurrentWidgetWithMesh]);

    return <>{children}</>;
};

export default TransformControlsComponent;
