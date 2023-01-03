import {
    ArrowHelper,
    AxesHelper,
    Box3Helper,
    BoxHelper,
    CameraHelper,
    DirectionalLightHelper,
    GridHelper,
    HemisphereLightHelper,
    PlaneHelper,
    PointLightHelper,
    PolarGridHelper,
    SkeletonHelper,
    SpotLightHelper,
} from "three";

import { HelpersTypes } from "../widgetsConstants";

export default (helper?: HelpersTypes) => {
    switch (helper) {
        case HelpersTypes.ArrowHelper:
            return ArrowHelper;
        case HelpersTypes.AxesHelper:
            return AxesHelper;
        case HelpersTypes.BoxHelper:
            return BoxHelper;
        case HelpersTypes.Box3Helper:
            return Box3Helper;
        case HelpersTypes.CameraHelper:
            return CameraHelper;
        case HelpersTypes.DirectionalLightHelper:
            return DirectionalLightHelper;
        case HelpersTypes.GridHelper:
            return GridHelper;
        case HelpersTypes.PolarGridHelper:
            return PolarGridHelper;
        case HelpersTypes.HemisphereLightHelper:
            return HemisphereLightHelper;
        case HelpersTypes.PlaneHelper:
            return PlaneHelper;
        case HelpersTypes.PointLightHelper:
            return PointLightHelper;
        case HelpersTypes.SkeletonHelper:
            return SkeletonHelper;
        case HelpersTypes.SpotLightHelper:
            return SpotLightHelper;

        default:
            return BoxHelper;
    }
};
