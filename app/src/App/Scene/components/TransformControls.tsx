import useCurrentMode from "@app/Editor/_actions/hooks/useCurrentMode";
import useIsEditing from "@app/Editor/_actions/hooks/useIsEditing";
import usePrevious from "@common/hooks/usePrevious";
import { useThree } from "@react-three/fiber";
import useGetWidgets from "@widgets/_actions/hooks/useGetWidgets";
import useWidgets from "@widgets/_actions/hooks/useWidgets";
import useWidgetsActions from "@widgets/_actions/hooks/useWidgetsActions";
import isEqual from "lodash/isEqual";
import { FC, useEffect, useState } from "react";
import { Object3D } from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

const TransformControlsComponent: FC = ({ children }) => {
    const { camera, scene, gl } = useThree();
    const { updateCurrentWidgetWithMesh } = useWidgetsActions();
    const { currentWidgets, firstCurrentWidget } = useWidgets();
    const { getMeshByWidget } = useGetWidgets();
    const { currentMode } = useCurrentMode();
    const { setIsEditing } = useIsEditing();
    const [transformControl, setTransformControl] = useState<TransformControls>();
    const [attachedMesh, setAttachedMesh] = useState<Object3D>();
    const previousCurrentWidgets = usePrevious(currentWidgets);
    const previousCurrentMode = usePrevious(currentMode);

    useEffect(() => {
        if (!transformControl && attachedMesh) {
            const transformC = new TransformControls(camera, gl.domElement);

            transformC.attach(attachedMesh);
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
    }, [transformControl, camera, scene, gl, attachedMesh, currentMode]);

    /**
     * Detach the transformControl whenever the current element change
     */
    useEffect(() => {
        if (transformControl && !isEqual(previousCurrentWidgets, currentWidgets)) {
            transformControl.detach();
            setAttachedMesh(undefined);
        }
    }, [
        currentWidgets,
        currentWidgets.length,
        firstCurrentWidget?.id,
        previousCurrentWidgets,
        transformControl,
    ]);

    useEffect(() => {
        if (transformControl && currentMode !== previousCurrentMode) {
            transformControl.setMode(currentMode);
        }
    }, [currentMode, previousCurrentMode, transformControl]);

    useEffect(() => {
        if (currentWidgets.length) {
            setAttachedMesh(getMeshByWidget(currentWidgets[0]));
        }
    }, [currentWidgets, currentWidgets.length, firstCurrentWidget?.id, getMeshByWidget]);

    /**
     * Initialize events on transformControls.
     * Updated each time elementsOnScene is modified to keep the state updated
     */
    useEffect(() => {
        const onTransformControlMouseUp = () => {
            if (attachedMesh) {
                updateCurrentWidgetWithMesh(attachedMesh);
            }
        };

        const onDraggingChangedHandler = ({ value }: any) => {
            setIsEditing(value);
        };

        const onObjectChangeHandler = () => {
            updateCurrentWidgetWithMesh(attachedMesh, true);
        };

        transformControl?.addEventListener("mouseUp", onTransformControlMouseUp);
        transformControl?.addEventListener("dragging-changed", onDraggingChangedHandler);
        transformControl?.addEventListener("objectChange", onObjectChangeHandler);

        return () => {
            transformControl?.removeEventListener("mouseUp", onTransformControlMouseUp);
            transformControl?.removeEventListener("dragging-changed", onDraggingChangedHandler);
            transformControl?.removeEventListener("objectChange", onObjectChangeHandler);
        };
    }, [transformControl, attachedMesh, updateCurrentWidgetWithMesh, setIsEditing]);

    return <>{children}</>;
};

export default TransformControlsComponent;
