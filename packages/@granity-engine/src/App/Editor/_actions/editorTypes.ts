import { Dictionary } from "@granity/helpers";
import {
    WidgetDictionary,
    WidgetObjectInfoDictionary,
} from "@granity-engine/App/Widgets/_actions/widgetsTypes";

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
    widgetsObjectInfoDictionary: WidgetObjectInfoDictionary;
    widgets: WidgetDictionary;
};
