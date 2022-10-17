import { WidgetProperties } from "./widgetsTypes";

export enum HelpersTypes {
    ArrowHelper = "ArrowHelper",
    AxesHelper = "AxesHelper",
    BoxHelper = "BoxHelper",
    Box3Helper = "Box3Helper",
    CameraHelper = "CameraHelper",
    DirectionalLightHelper = "DirectionalLightHelper",
    GridHelper = "GridHelper",
    PolarGridHelper = "PolarGridHelper",
    HemisphereLightHelper = "HemisphereLightHelper",
    PlaneHelper = "PlaneHelper",
    PointLightHelper = "PointLightHelper",
    SkeletonHelper = "SkeletonHelper",
    SpotLightHelper = "SpotLightHelper",
}

export default {
    widgetObjectsPrefix: "WidgetRenderer",
    widgetDefaultProperties: {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
    } as WidgetProperties,
};
