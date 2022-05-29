import { useThree } from "@react-three/fiber";
import { FC, useEffect, useState } from "react";
import { Group, Object3D } from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import useCurrentMode from "../../Editor/state/hooks/useCurrentMode";
import useIsEditing from "../../Editor/state/hooks/useIsEditing";
import useGetWidgets from "../../Widgets/hooks/useGetWidgets";
import useWidgets from "../../Widgets/hooks/useWidgets";
import useWidgetsActions from "../../Widgets/hooks/useWidgetsActions";

const TransformControlsComponent: FC = ({ children }) => {
    const { camera, scene, gl } = useThree();
    const { updateCurrentWidgetWithMesh } = useWidgetsActions();
    const { currentWidgets, firstCurrentWidget } = useWidgets();
    const { getMeshByWidget } = useGetWidgets();
    const { currentMode } = useCurrentMode();
    const { setIsEditing } = useIsEditing();
    const [transformControl, setTransformControl] = useState<TransformControls>();
    const [attachedMesh, setAttachedMesh] = useState<Object3D>();
    const [temporaryGroup] = useState<Group>();

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

    useEffect(() => {
        if (transformControl) {
            transformControl.setMode(currentMode);
        }
    }, [currentMode, transformControl]);

    useEffect(() => {
        if (currentWidgets.length) {
            setAttachedMesh(getMeshByWidget(currentWidgets[0]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWidgets.length, firstCurrentWidget?.id, getMeshByWidget]);

    /**
     * Detach the transformControl whenever the current element change
     */
    useEffect(() => {
        if (transformControl) {
            transformControl.detach();
            setAttachedMesh(undefined);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWidgets.length, currentWidgets[0]?.id, temporaryGroup]);

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
