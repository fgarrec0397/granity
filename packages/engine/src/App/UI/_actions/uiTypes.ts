import {
    BaseWidgetInfo,
    Widget,
    WidgetDictionaryItem,
    WidgetOptions,
} from "@engine/App/Widgets/_actions/widgetsTypes";
import { Dictionary, UnionOfProperties } from "@granity/helpers";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UIWidgetProps {}
export type DefaultWidgetProps = UnionOfProperties<UIWidgetProps>;

/**
 * Base UI widget type
 */
export type UIWidget<Props = DefaultWidgetProps, Options = WidgetOptions> = Widget<Props, Options>;

/**
 * Widget module to generate UI elements
 */
export type UIWidgetModule<Props = DefaultWidgetProps, Options = WidgetOptions> = Widget<
    Props,
    null,
    Options
>;

/**
 * A dictionary containing informations about all widgets
 */
export type UIWidgetDictionary = Dictionary<UIWidgetDictionaryItem>;

/**
 * Informations of a widget
 */
export type UIWidgetDictionaryItem = WidgetDictionaryItem;

/**
 * A serialized dictionary containing informations about all WidgetDictionary
 */
export type UISerializedWidgetDictionary = Dictionary<UISerializedWidgetDictionaryItem>;

/**
 * A serialized version of WidgetDictionaryItem type
 */
export type UISerializedWidgetDictionaryItem = Omit<UIWidgetDictionaryItem, "component">;

/**
 * Widget UI info dictionary
 */
export type UIWidgetInfoDictionary = Dictionary<UIWidgetInfoDictionaryItem>;

export type UIWidgetInfoDictionaryItem = BaseWidgetInfo;
