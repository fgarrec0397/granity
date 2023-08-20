import { GameWidgetProperties, HelpersTypes } from "@engine/App/Game/_actions/gameTypes";

/**
 * Allowed Fieldtypes
 */
export enum GameOptionsFieldTypes {
    Text = "Text",
    Number = "Number",
    Select = "Select",
    Checkbox = "Checkbox",
    Vector3 = "Vector3",
    File = "File",
}

export const helpersTypes: HelpersTypes = {
    ArrowHelper: "ArrowHelper",
    AxesHelper: "AxesHelper",
    BoxHelper: "BoxHelper",
    Box3Helper: "Box3Helper",
    CameraHelper: "CameraHelper",
    DirectionalLightHelper: "DirectionalLightHelper",
    GridHelper: "GridHelper",
    PolarGridHelper: "PolarGridHelper",
    HemisphereLightHelper: "HemisphereLightHelper",
    PlaneHelper: "PlaneHelper",
    PointLightHelper: "PointLightHelper",
    SkeletonHelper: "SkeletonHelper",
    SpotLightHelper: "SpotLightHelper",
    AmbientLightHelper: "PointLightHelper",
    RectAreaLightHelper: "RectAreaLightHelper",
};

export const gameWidgetPrefix = "WidgetRenderer";

export const widgetDefaultProperties: GameWidgetProperties = {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
};
