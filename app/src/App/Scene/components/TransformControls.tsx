import { useThree } from "@react-three/fiber";
import { FC, useEffect, useState } from "react";
import { Group, Object3D } from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import useCurrentMode from "../../Editor/state/hooks/useCurrentMode";
import useIsEditing from "../../Editor/state/hooks/useIsEditing";
import useGetWidgets from "../../Widgets/state/hooks/useGetWidgets";
import useWidgets from "../../Widgets/state/hooks/useWidgets";
import useWidgetsActions from "../../Widgets/state/hooks/useWidgetsActions";

const TransformControlsComponent: FC = ({ children }) => {
    const { camera, scene, gl } = useThree();
    const { updateCurrentWidgetWithMesh } = useWidgetsActions();
    const { currentWidgets, firstCurrentWidget } = useWidgets();
    const { getMeshByWidget } = useGetWidgets();
    const { currentMode } = useCurrentMode();
    const { setIsEditing } = useIsEditing();
    const [transformControl, setTransformControl] = useState<TransformControls>();
    const [stateMesh, setStateMesh] = useState<Object3D>();
    const [temporaryGroup] = useState<Group>();

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
                updateCurrentWidgetWithMesh(stateMesh);
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
