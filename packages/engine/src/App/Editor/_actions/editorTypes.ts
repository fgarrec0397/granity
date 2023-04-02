import {
    WidgetDictionary,
    WidgetObjectInfoDictionary,
} from "@engine/App/Widgets/_actions/widgetsTypes";
import { Dictionary } from "@granity/helpers";

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

export type FilesData = {
    currentRootPath: string;
    folders: FileItem[];
    files: FileItem[];
};

export type FileItem = {
    path: string;
    name: string;
    type: string;
};
