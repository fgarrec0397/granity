import {
    WidgetDictionary,
    WidgetInfoDictionary,
    WidgetsIds,
} from "@engine/App/Widgets/_actions/widgetsTypes";
import { Dictionary } from "@granity/helpers";

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
    widgetsInfoDictionary: WidgetInfoDictionary;
    widgets: WidgetDictionary;
    widgetsIds: WidgetsIds;
};

/**
 * React DnD editor draggable list item type
 */
export type EditorListDragItem = {
    index: number;
    id: string;
    title?: string;
    path: string;
    type: string;
};
