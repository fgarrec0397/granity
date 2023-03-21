import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import useGetWidgets from "@engine/App/Widgets/_actions/hooks/useGetMeshByWidget";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { debounce, isEqual, usePrevious } from "@granity/helpers";
import { Object3D, TransformControls } from "@granity/three";
import { useThree } from "@granity/three/fiber";
import { FC, useEffect, useMemo, useState } from "react";

const TransformControlsComponent: FC = () => {
    const { camera, scene, gl } = useThree();
    const { selectedWidgets, firstCurrentWidget, updatetWidgetWithMesh } = useWidgets();
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
            (!previousSelectedWidgets || !isEqual(selectedWidgets, previousSelectedWidgets)) &&
            !selectedWidgets[0].isFrozen
        ) {
            setMeshToAttach(getMeshByWidget(selectedWidgets[0]));
        } else if (previousSelectedWidgets?.length && !selectedWidgets.length) {
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
        const onObjectChangeHandler = () => {
            updatetWidgetWithMesh(selectedWidgets[0].id, meshToAttach, true);
        };

        const debouncedObjectChange = debounce(onObjectChangeHandler, 40);

        const onTransformControlMouseUp = () => {
            if (meshToAttach) {
                updatetWidgetWithMesh(selectedWidgets[0].id, meshToAttach);
            }
            debouncedObjectChange.cancel();
        };

        const onDraggingChangedHandler = ({ value }: any) => {
            setIsEditing(value);
        };

        transformControls?.addEventListener("mouseUp", onTransformControlMouseUp);
        transformControls?.addEventListener("dragging-changed", onDraggingChangedHandler);
        transformControls?.addEventListener("objectChange", debouncedObjectChange);

        return () => {
            transformControls?.removeEventListener("mouseUp", onTransformControlMouseUp);
            transformControls?.removeEventListener("dragging-changed", onDraggingChangedHandler);
            transformControls?.removeEventListener("objectChange", debouncedObjectChange);
        };
    }, [transformControls, meshToAttach, updatetWidgetWithMesh, setIsEditing, selectedWidgets]);

    return null;
};

export default TransformControlsComponent;
