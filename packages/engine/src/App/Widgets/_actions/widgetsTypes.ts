import { IdsArray, IdsArrayItem } from "@engine/App/Core/_actions/coreTypes";
import { Dictionary, EmptyObject, UnionOfProperties } from "@granity/helpers";
import { Slice } from "@reduxjs/toolkit";
import { FC, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from "react";

import { WidgetType } from "./widgetsConstants";

/// ---------------- Types for external typing ---------------- ///

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WidgetProps {}
export type DefaultWidgetProps = UnionOfProperties<WidgetProps> | EmptyObject;

/// ---------------------- Widget Module ---------------------- ///

/**
 * Base widget type
 */
export type Widget<Props = DefaultWidgetProps> = {
    component:
        | FC
        | FC<Props>
        | ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<any>>
        | any;
    reducer: Slice | null;
    name: string;
};

export type WidgetModule<Props = DefaultWidgetProps> = Widget<Props> & {
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

export type WidgetInfoValueParameter = Partial<Omit<WidgetInfoDictionaryItem, "id">>;
export type WidgetValueParameter = Partial<Omit<WidgetDictionaryItem, "id">>;

export type WidgetsIds = IdsArray;
export type WidgetId = IdsArrayItem;
