import { Dictionary } from "@granity/helpers";
import { Slice } from "@reduxjs/toolkit";

/// ---------------------- Widget Module ---------------------- ///

/**
 * Base widget type
 */
export type Widget = {
    reducer: Slice | null;
    name: string;
};

/// ----------------- Widgets Info Dictionary ----------------- ///

/**
 * A dictionary containing editable informations about all Widget types
 */
export type WidgetInfoDictionary = Dictionary<WidgetInfo>;

export type WidgetInfo = {
    id: string;
    displayName?: string;
};
