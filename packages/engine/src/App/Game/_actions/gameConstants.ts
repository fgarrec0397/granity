import { GameWidgetProperties, HelpersTypes } from "@engine/App/Game/_actions/gameTypes";

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
};

export const gameWidgetPrefix = "WidgetRenderer";

export const widgetDefaultProperties: GameWidgetProperties = {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
};
