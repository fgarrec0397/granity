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
} from "@granity/three";

import { helpersTypes } from "../gameConstants";
import { HelperTypeValue } from "../gameTypes";

export default (helper?: HelperTypeValue) => {
    switch (helper) {
        case helpersTypes.ArrowHelper:
            return ArrowHelper;
        case helpersTypes.AxesHelper:
            return AxesHelper;
        case helpersTypes.BoxHelper:
            return BoxHelper;
        case helpersTypes.Box3Helper:
            return Box3Helper;
        case helpersTypes.CameraHelper:
            return CameraHelper;
        case helpersTypes.DirectionalLightHelper:
            return DirectionalLightHelper;
        case helpersTypes.GridHelper:
            return GridHelper;
        case helpersTypes.PolarGridHelper:
            return PolarGridHelper;
        case helpersTypes.HemisphereLightHelper:
            return HemisphereLightHelper;
        case helpersTypes.PlaneHelper:
            return PlaneHelper;
        case helpersTypes.PointLightHelper:
            return PointLightHelper;
        case helpersTypes.SkeletonHelper:
            return SkeletonHelper;
        case helpersTypes.SpotLightHelper:
            return SpotLightHelper;

        default:
            return BoxHelper;
    }
};
