import { WidgetDictionary, WidgetInfoDictionary } from "@app/Widgets/_actions/widgetsTypes";
import { Dictionary } from "@granity/helpers";
import { Vector3Array } from "@react-three/rapier";

/**
 * Additional props that applies for widgets in the editor
 */
export interface EditableWidget {
    hovered: boolean;
    position: Vector3Array;
    rotation: Vector3Array;
    scale: Vector3Array;
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
export type HistoryDictionary = Dictionary<HistoryItem>;

/**
 * One history item
 */
export type HistoryItem = {
    id: string;
    order: number;
    state: HistoryState;
};

/**
 * A snapshot of a editor state
 */
export type HistoryState = {
    widgetsObjectInfoDictionary: WidgetInfoDictionary;
    widgets: WidgetDictionary;
};
