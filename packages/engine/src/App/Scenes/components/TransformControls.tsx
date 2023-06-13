import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import useGameWidgets from "@engine/App/Game/_actions/hooks/useGameWidgets";
import useGetMeshByGameWidget from "@engine/App/Game/_actions/hooks/useGetMeshByGameWidget";
import { debounce, isEqual, usePrevious } from "@granity/helpers";
import { Object3D, TransformControls } from "@granity/three";
import { useThree } from "@granity/three/fiber";
import { FC, useEffect, useMemo, useState } from "react";

const TransformControlsComponent: FC = () => {
    const { camera, scene, gl } = useThree();
    const { updateGameWidgetWithMesh, selectedGameWidgets, gameWidgetsIds } = useGameWidgets();
    const getMeshByGameWidget = useGetMeshByGameWidget();
    const { setIsEditing, isEditing, currentMode } = useEditor();
    const [meshToAttach, setMeshToAttach] = useState<Object3D>();

    const previousCurrentMode = usePrevious(currentMode);
    const previousSelectedWidgets = usePrevious(selectedGameWidgets);
    const previousGameWidgets = usePrevious(gameWidgetsIds);
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
     * Reset the attached mesh when widgets ids change
     */
    useEffect(() => {
        if (selectedGameWidgets.length && !isEqual(gameWidgetsIds, previousGameWidgets)) {
            setMeshToAttach(undefined);
            setMeshToAttach(getMeshByGameWidget(selectedGameWidgets[0]));
        }
    }, [gameWidgetsIds, getMeshByGameWidget, previousGameWidgets, selectedGameWidgets]);

    /**
     * Update the current mesh to be attached to TransformControls when it changes
     */
    useEffect(() => {
        if (
            selectedGameWidgets.length &&
            (!previousSelectedWidgets || !isEqual(selectedGameWidgets, previousSelectedWidgets)) &&
            !selectedGameWidgets[0].isFrozen
        ) {
            setMeshToAttach(getMeshByGameWidget(selectedGameWidgets[0]));
        } else if (previousSelectedWidgets?.length && !selectedGameWidgets.length) {
            setMeshToAttach(undefined);
        }
    }, [
        selectedGameWidgets,
        selectedGameWidgets.length,
        getMeshByGameWidget,
        previousSelectedWidgets,
        transformControls,
    ]);

    /**
     * Initialize events on TransformControls
     */
    useEffect(() => {
        const onObjectChangeHandler = () => {
            updateGameWidgetWithMesh(selectedGameWidgets[0].id, meshToAttach, true);
        };

        const debouncedObjectChange = debounce(onObjectChangeHandler, 40);

        const onTransformControlMouseUp = () => {
            if (meshToAttach) {
                updateGameWidgetWithMesh(selectedGameWidgets[0].id, meshToAttach);
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
    }, [
        transformControls,
        meshToAttach,
        updateGameWidgetWithMesh,
        setIsEditing,
        isEditing,
        selectedGameWidgets,
    ]);

    return null;
};

export default TransformControlsComponent;
