import { buildWidgetInfo } from "@engine/api";
import {
    GameWidgetDictionaryItem,
    GameWidgetInfoDictionaryItem,
    GameWidgetOptionsValues,
    GameWidgetProperties,
    SerializedGameWidgetDictionaryItem,
} from "@engine/App/Game/_actions/gameTypes";
import widgetsConstants from "@engine/App/Widgets/_actions/widgetsConstants";
import { WidgetInfoBuilder } from "@engine/App/Widgets/_actions/widgetsTypes";
import { serializeVector3 } from "@granity/helpers";
import { Object3D } from "@granity/three";

import gameWidgetInfoMapper from "../mappers/gameWidgetInfoMapper";

export type GameWidgetsDictionaryBuilderOptions = {
    mesh?: Object3D;
    properties?: GameWidgetProperties;
    options?: GameWidgetOptionsValues;
};

/**
 *
 * Builds a widgetsInfoDictionary based on the given widgetsDictionaryItem to fill the values
 *
 * @param widget - The taken widget to build the widgetObjectInfo
 * @param builderOptions - Overrides the widget options by passing your own options
 * @returns - A WidgetInfoDictionaryItem
 */
export const buildGameWidgetInfo: WidgetInfoBuilder<
    GameWidgetInfoDictionaryItem,
    GameWidgetDictionaryItem
> = (
    widget: GameWidgetDictionaryItem,
    builderOptions?: GameWidgetsDictionaryBuilderOptions
): GameWidgetInfoDictionaryItem => {
    let widgetProperties: GameWidgetProperties = widgetsConstants.widgetDefaultProperties;

    const options = builderOptions?.options
        ? builderOptions?.options
        : buildGameWidgetInfoDictionaryOptions(widget);

    if (builderOptions?.mesh) {
        widgetProperties = buildWidgetDictionaryProperties(builderOptions.mesh);
    }

    if (builderOptions?.properties) {
        widgetProperties = builderOptions.properties;
    }

    return gameWidgetInfoMapper(buildWidgetInfo(widget), {
        properties: widgetProperties,
        options,
    });
};

/**
 *
 * @param widget - The widget to build the options of the widgetsInfoDictionartItem
 * @returns - The options created from the given widget
 */
export const buildGameWidgetInfoDictionaryOptions = (
    widget: GameWidgetDictionaryItem | SerializedGameWidgetDictionaryItem
) => {
    const options: GameWidgetOptionsValues<any> = {};
    const widgetOptions = widget.options;

    if (widgetOptions?.length) {
        for (const option of widgetOptions) {
            options[option.name] = {
                fieldType: option.fieldType,
                value: option.defaultValue,
            };
        }
    }

    return options;
};

export const buildWidgetDictionaryProperties = (mesh: Object3D) => {
    return {
        position: serializeVector3(mesh.position),
        rotation: serializeVector3(mesh.rotation),
        scale: serializeVector3(mesh.scale),
    };
};
