import { WidgetModules } from "@granity/engine";

import type { CamerasProps } from "./Cameras";
import type { GeometryFormsProps } from "./GeometryForms";
import type { TerrainProps } from "./Terrain";
import type { WidgetStarterProps, WidgetStarterState } from "./WidgetStarter";
import { WidgetStarter2State } from "./WidgetStarter2";

const modules = import.meta.glob("./*/*.tsx", { eager: true });

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

declare module "@granity/engine" {
    interface State {
        features: {
            widgetStarter: WidgetStarterState;
            widgetStarter2: WidgetStarter2State;
        };
    }
}

const resolveModules = () => {
    const widgetsModules: WidgetModules[] = [];
    for (const path in modules) {
        const { widget } = modules[path] as any;
        widgetsModules.push(widget);
    }

    return widgetsModules;
};

export default resolveModules();
