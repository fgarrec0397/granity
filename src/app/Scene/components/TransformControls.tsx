import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { useThree } from "@react-three/fiber";
import React, { FC, useEffect, useState } from "react";
import { Group, Object3D } from "three";
import useCurrentMode from "../../Editor/state/hooks/useCurrentMode";
import useIsEditing from "../../Editor/state/hooks/useIsEditing";
import serializeVector3 from "../../Common/utils/serializeVector3";
import useWidgets from "../../Widgets/state/hooks/useWidgets";
import useWidgetsUtilities from "../../Widgets/state/hooks/useWidgetsUtilities";

const TransformControlsComponent: FC = ({ children }) => {
    const { mouse, camera, raycaster, scene, gl } = useThree();
    const { getWidgetByMesh, getMeshByWidget } = useWidgetsUtilities();
    const { currentWidgets, selectWidget, updateCurrentWidgetProperties } = useWidgets();
    const { currentMode } = useCurrentMode();
    const { setIsEditing, isEditing } = useIsEditing();
    const [transformControl, setTransformControl] = useState<TransformControls>();
    const [stateMesh, setStateMesh] = useState<Object3D>();
    const [temporaryGroup, setTemporaryGroup] = useState<Group>();

    useEffect(() => {
        console.log(scene.children, "scene.children");
    }, [scene.children.length]);
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
    }, [transformControl, camera, scene, gl, stateMesh]);

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
    }, [currentWidgets]);

    /**
     * Initialize mouse up events
     */
    useEffect(() => {
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [scene.children.length, currentWidgets.length, temporaryGroup]);

    /**
     * Initialize events on transformControls.
     * Updated each time elementsOnScene is modified to keep the state updated
     */
    useEffect(() => {
        transformControl?.addEventListener("dragging-changed", onDraggingChangedHandler);
        transformControl?.addEventListener("objectChange", onObjectChangeHandler);

        return () => {
            transformControl?.removeEventListener("dragging-changed", onDraggingChangedHandler);
            transformControl?.removeEventListener("objectChange", onObjectChangeHandler);
        };
    }, [transformControl, currentWidgets.length]);

    /**
     * Detach the transformControl whenever the current element change
     */
    useEffect(() => {
        if (transformControl) {
            transformControl.detach();
        }
    }, [currentWidgets.length, currentWidgets[0]?.id, temporaryGroup]);

    /**
     * Update the transformControl mode when the currentMode changes
     */
    useEffect(() => {
        if (transformControl) {
            transformControl.setMode(currentMode);
        }
    }, [currentMode]);

    /**
     * Raycast the closest element and select it as the current element
     * @param event
     */
    const onMouseUp = (event: MouseEvent): void => {
        event.preventDefault();

        const isMultipleSelect = event.ctrlKey;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            const [closestMesh] = intersects.sort((x: any) => x.distance);
            const { widget } = getWidgetByMesh(closestMesh.object);

            if (widget) {
                selectWidget(widget, isMultipleSelect);
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

    /**
     * Change isEditing value based on the dragging-changed event
     * @param event
     */
    const onDraggingChangedHandler = ({ value }: any) => {
        setIsEditing(value);
    };

    /**
     * Update the currentElement based on the mesh properties
     */
    const onObjectChangeHandler = () => {
        if (stateMesh) {
            updateCurrentWidgetProperties({
                position: serializeVector3(stateMesh.position),
                rotation: serializeVector3(stateMesh.rotation),
                scale: serializeVector3(stateMesh.scale),
            });
        }
    };

    return <>{children}</>;
};

export default TransformControlsComponent;
