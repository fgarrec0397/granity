import { WidgetObjectModule, WidgetUIModule } from "@granity/engine";

import type { CamerasProps } from "./Cameras";
import type { GeometryFormsProps } from "./GeometryForms";
import type { TerrainProps } from "./Terrain";
import type { WidgetStarterProps, WidgetStarterState } from "./WidgetStarter";

const modules = import.meta.glob("./*/*.tsx");

/**
 * Add your Widgets Props here as union types
 */
export type FeaturesWidgetsProps = GeometryFormsProps &
    CamerasProps &
    TerrainProps &
    WidgetStarterProps;

/**
 * Add your Widgets reducers state here
 */
export interface FeaturesState {
    widgetStarter: WidgetStarterState;
}

/**
 * Extracts widgets from loaded modules and export them for further use.
 *
 * You should not touch this function
 */
export const loadWidgetsFromModules = async () => {
    const widgetModules: WidgetObjectModule[] | WidgetUIModule[] = [];

    for (const path in modules) {
        const { widget } = (await modules[path]()) as any;
        widgetModules.push(widget);
    }

    return widgetModules;
};
