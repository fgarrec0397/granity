import { WidgetObjectModule, WidgetUIModule } from "@app/Widgets/_actions/widgetsTypes";
import type { CamerasProps } from "@features/Widgets/Cameras";
import type { GeometryFormsProps } from "@features/Widgets/GeometryForms";
import type { TerrainProps } from "@features/Widgets/Terrain";
import type { WidgetStarterProps, WidgetStarterState } from "@features/Widgets/WidgetStarter";

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
