import { WidgetType } from "@engine/App/Widgets/_actions/widgetsConstants";
import { WidgetInfo } from "@engine/App/Widgets/_actions/widgetsTypes";
import { Dictionary, UnionOfProperties } from "@granity/helpers";
import { Slice } from "@reduxjs/toolkit";
import { FC } from "react";

/// ---------------- Types for external typing ---------------- ///

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UIWidgetProps {}
export type DefaultUIWidgetProps = UnionOfProperties<UIWidgetProps>;

/// ---------------------- UIWidget Module ---------------------- ///

/**
 * Base widget type
 */
export type UIWidget<Props = DefaultUIWidgetProps> = {
    component: UIWidgetComponent<Props>;
    reducer: Slice | null;
    name: string;
};

export type UIWidgetModule<Props = DefaultUIWidgetProps> = UIWidget<Props> & {
    type: WidgetType.UI;
};

/**
 * A component type of a widget
 */
export type UIWidgetComponent<Props = DefaultUIWidgetProps> = FC<Props>;

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
