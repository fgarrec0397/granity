import useCurrentMode from "@app/Editor/_actions/hooks/useCurrentMode";
import useIsEditing from "@app/Editor/_actions/hooks/useIsEditing";
import usePrevious from "@common/hooks/usePrevious";
import { useThree } from "@react-three/fiber";
import useGetWidgets from "@widgets/_actions/hooks/useGetWidgets";
import useWidgets from "@widgets/_actions/hooks/useWidgets";
import useWidgetsActions from "@widgets/_actions/hooks/useWidgetsActions";
import isEqual from "lodash/isEqual";
import { FC, useEffect, useMemo, useState } from "react";
import { Object3D } from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

const TransformControlsComponent: FC = ({ children }) => {
    const { camera, scene, gl } = useThree();
    const { updateCurrentWidgetWithMesh } = useWidgetsActions();
    const { currentWidgets, firstCurrentWidget } = useWidgets();
    const { getMeshByWidget } = useGetWidgets();
    const { currentMode } = useCurrentMode();
    const { setIsEditing } = useIsEditing();
    const [meshToAttach, setMeshToAttach] = useState<Object3D>();

    const previousCurrentMode = usePrevious(currentMode);
    const previousCurrentWidgets = usePrevious(currentWidgets);
    const transformControls = useMemo(
        () => new TransformControls(camera, gl.domElement),
        [camera, gl.domElement]
    );

    /**
     * Add TransformControls on the scene and remove it when it unmounted
     */
    useEffect(() => {
        scene.add(transformControls);

        return () => {
            scene.remove(transformControls);
        };
    }, [scene, meshToAttach, transformControls]);

    /**
     * Attach the selected mesh on the scene to TransformControls
     * Whenever it is unmounted, it detach all attached meshes
     */
    useEffect(() => {
        if (meshToAttach) {
            transformControls.attach(meshToAttach);
        }

        return () => {
            transformControls.detach();
        };
    }, [scene, meshToAttach, transformControls]);

    /**
     * Set the current mode of TransformControls when it changes
     */
    useEffect(() => {
        if (currentMode !== previousCurrentMode) {
            transformControls.setMode(currentMode);
        }
    }, [currentMode, previousCurrentMode, transformControls]);

    /**
     * Update the current the mesh to be attached to TransformControls when it changes
     */
    useEffect(() => {
        if (currentWidgets.length && !isEqual(currentWidgets, previousCurrentWidgets)) {
            setMeshToAttach(getMeshByWidget(currentWidgets[0]));
        }

        return () => {
            setMeshToAttach(undefined);
        };
    }, [
        currentWidgets,
        currentWidgets.length,
        firstCurrentWidget.id,
        getMeshByWidget,
        previousCurrentWidgets,
    ]);

    /**
     * Initialize events on TransformControls
     */
    useEffect(() => {
        const onTransformControlMouseUp = () => {
            if (meshToAttach) {
                updateCurrentWidgetWithMesh(meshToAttach);
            }
        };

        const onDraggingChangedHandler = ({ value }: any) => {
            setIsEditing(value);
        };

        const onObjectChangeHandler = () => {
            updateCurrentWidgetWithMesh(meshToAttach, true);
        };

        transformControls?.addEventListener("mouseUp", onTransformControlMouseUp);
        transformControls?.addEventListener("dragging-changed", onDraggingChangedHandler);
        transformControls?.addEventListener("objectChange", onObjectChangeHandler);

        return () => {
            transformControls?.removeEventListener("mouseUp", onTransformControlMouseUp);
            transformControls?.removeEventListener("dragging-changed", onDraggingChangedHandler);
            transformControls?.removeEventListener("objectChange", onObjectChangeHandler);
        };
    }, [transformControls, meshToAttach, updateCurrentWidgetWithMesh, setIsEditing]);

    return <>{children}</>;
};

export default TransformControlsComponent;
