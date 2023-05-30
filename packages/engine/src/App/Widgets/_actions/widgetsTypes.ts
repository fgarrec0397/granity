import { Dictionary } from "@granity/helpers";
import { Slice } from "@reduxjs/toolkit";
import { FC } from "react";

import { WidgetType } from "./widgetsConstants";

/// ---------------------- Widget Module ---------------------- ///

/**
 * Base widget type
 */
export type Widget<Props = any> = {
    component: FC<Props>;
    reducer: Slice | null;
    name: string;
};

export type WidgetModule<Props = any> = Widget<Props> & {
    type: WidgetType;
};

/**
 * A dictionary containing informations about all GameWidgetObjectsDictionary
 */
export type WidgetDictionary = Dictionary<WidgetDictionaryItem>;

/**
 * Informations of a widget object on the scene
 */
export type WidgetDictionaryItem = Omit<WidgetModule, "reducer"> & {
    id: string;
};

/// ----------------- Widgets Info Dictionary ----------------- ///

/**
 * A dictionary containing editable informations about all Widget types
 */
export type WidgetInfoDictionary = Dictionary<WidgetInfoDictionaryItem>;

export type WidgetInfo = {
    id: string;
    displayName?: string;
};

export type WidgetInfoDictionaryItem = WidgetInfo;

/// -------------- Serialized Widgets Dictionary -------------- ///

/**
 * A dictionary containing informations about all widgets
 */
export type SerializedWidgetDictionary = Dictionary<SerializedWidgetDictionaryItem>;

/**
 * Informations of a widget
 */
export type SerializedWidgetDictionaryItem = Omit<WidgetDictionaryItem, "component">;

export type WidgetInfoBuilder<
    WidgetInfoDictionaryItemType extends WidgetInfoDictionaryItem,
    WidgetDictionaryItemType,
    BuilderOptions
> = (widget: WidgetDictionaryItemType, options?: BuilderOptions) => WidgetInfoDictionaryItemType;

/// -------------- Widgets Actions Parameters -------------- ///

export type WidgetValueParameter = Partial<Omit<WidgetInfoDictionaryItem, "id">>;
