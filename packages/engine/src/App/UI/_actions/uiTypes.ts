import { WidgetType } from "@engine/App/Widgets/_actions/widgetsConstants";
import { WidgetInfo } from "@engine/App/Widgets/_actions/widgetsTypes";
import { Dictionary } from "@granity/helpers";
import { Slice } from "@reduxjs/toolkit";
import { FC } from "react";

/// ---------------------- UIWidget Module ---------------------- ///

/**
 * Base widget type
 */
export type UIWidget = {
    component: FC;
    reducer: Slice | null;
    name: string;
};

export type UIWidgetModule = UIWidget & {
    type: WidgetType.UI;
};

/// ------------------- Widgets Dictionary -------------------- ///

/**
 * A dictionary containing informations about all widgets
 */
export type UIWidgetDictionary = Dictionary<UIWidgetDictionaryItem>;

/**
 * Informations of a widget
 */
export type UIWidgetDictionaryItem = Omit<UIWidgetModule, "reducer"> & {
    id: string;
};

/// -------------- Serialized Widgets Dictionary -------------- ///

/**
 * A dictionary containing informations about all widgets
 */
export type SerializedUIWidgetDictionary = Dictionary<SerializedUIWidgetDictionaryItem>;

/**
 * Informations of a widget
 */
export type SerializedUIWidgetDictionaryItem = Omit<UIWidgetDictionaryItem, "component">;

/// ---------------- UIWidgets Info Dictionary --------------- ///

export type UIWidgetInfoDictionary = Dictionary<UIWidgetInfoDictionaryItem>;

export type UIWidgetInfoDictionaryItem = WidgetInfo;
