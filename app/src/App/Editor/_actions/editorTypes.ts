import { WidgetObjects, WidgetsDictionary } from "@widgets/_actions/widgetsTypes";

/**
 * Additional props that applies for widgets in the editor
 */
export interface EditableWidget {
    hovered: boolean;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
}

/**
 * Transform Controls Modes
 */
export enum ModesAvailable {
    Translate = "translate",
    Rotate = "rotate",
    Scale = "scale",
}

/**
 * The History dictionary containing all actions done by the user
 */
export type HistoryDictionary = {
    [id: string]: HistoryItem;
};

/**
 * One history item
 */
export type HistoryItem = {
    order: number;
    state: HistoryState;
};

/**
 * A snapshot of a editor state
 */
export type HistoryState = {
    widgetsDictionary: WidgetsDictionary;
    widgets: WidgetObjects;
};
