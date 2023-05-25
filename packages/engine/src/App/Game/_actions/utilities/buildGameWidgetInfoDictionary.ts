import { buildWidgetInfo } from "@engine/api";
import {
    GameWidgetDictionaryItem,
    GameWidgetInfoDictionaryItem,
    GameWidgetProperties,
    WidgetOptionsValues,
} from "@engine/App/Game/_actions/gameTypes";
import widgetsConstants from "@engine/App/Widgets/_actions/widgetsConstants";
import { serializeVector3 } from "@granity/helpers";
import { Object3D } from "@granity/three";

import gameWidgetInfoMapper from "../mappers/gameWidgetInfoMapper";

export type WidgetsDictionaryBuilderOptions = {
    mesh?: Object3D;
    properties?: GameWidgetProperties;
    options?: WidgetOptionsValues;
};

/**
 *
 * Builds a widgetsInfoDictionary based on the given widgetsDictionaryItem to fill the values
 *
 * @param widget - The taken widget to build the widgetObjectInfo
 * @param builderOptions - Overrides the widget options by passing your own options
 * @returns - A WidgetInfoDictionaryItem
 */
export const buildGameWidgetInfo = (
    widget: GameWidgetDictionaryItem,
    builderOptions?: WidgetsDictionaryBuilderOptions
): GameWidgetInfoDictionaryItem => {
    let widgetProperties: GameWidgetProperties = widgetsConstants.widgetDefaultProperties;

    if (builderOptions?.mesh) {
        widgetProperties = buildWidgetDictionaryProperties(builderOptions.mesh);
    }

    if (builderOptions?.properties) {
        widgetProperties = builderOptions.properties;
    }

    return gameWidgetInfoMapper(buildWidgetInfo(widget, builderOptions), {
        properties: widgetProperties,
    });
};

export const buildWidgetDictionaryProperties = (mesh: Object3D) => {
    return {
        position: serializeVector3(mesh.position),
        rotation: serializeVector3(mesh.rotation),
        scale: serializeVector3(mesh.scale),
    };
};
