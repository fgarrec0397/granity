import usePrevious from "@app/Common/hooks/usePrevious";
import useEditor from "@app/Editor/_actions/hooks/useEditor";
import useGetWidgets from "@app/Widgets/_actions/hooks/useGetMeshByWidget";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { useThree } from "@react-three/fiber";
import isEqual from "lodash/isEqual";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { Object3D } from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

type Props = {
    children?: ReactNode;
};

const TransformControlsComponent: FC<Props> = ({ children }) => {
    const { camera, scene, gl } = useThree();
    const { selectedWidgets, firstCurrentWidget, updateCurrentWidgetWithMesh } = useWidgets();
    const getMeshByWidget = useGetWidgets();
    const { setIsEditing, currentMode } = useEditor();
    const [meshToAttach, setMeshToAttach] = useState<Object3D>();

    const previousCurrentMode = usePrevious(currentMode);
    const previousSelectedWidgets = usePrevious(selectedWidgets);
    const transformControls = useMemo(
        () => new TransformControls(camera, gl.domElement),
        [camera, gl.domElement]
    );

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
     * Add TransformControls on the scene and remove it when it unmounted
     */
    useEffect(() => {
        scene.add(transformControls);

        return () => {
            scene.remove(transformControls);
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
     * Update the current mesh to be attached to TransformControls when it changes
     */
    useEffect(() => {
        if (
            selectedWidgets.length &&
            (!previousSelectedWidgets || !isEqual(selectedWidgets, previousSelectedWidgets))
        ) {
            setMeshToAttach(getMeshByWidget(selectedWidgets[0]));
        } else if (!selectedWidgets.length) {
            setMeshToAttach(undefined);
        }
    }, [
        selectedWidgets,
        selectedWidgets.length,
        firstCurrentWidget?.id,
        getMeshByWidget,
        previousSelectedWidgets,
        transformControls,
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
