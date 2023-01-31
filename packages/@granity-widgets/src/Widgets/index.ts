import type { CamerasProps } from "./Cameras";
import type { GeometryFormsProps } from "./GeometryForms";
import type { TerrainProps } from "./Terrain";
import type { WidgetStarterProps, WidgetStarterState } from "./WidgetStarter";

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
export interface FeaturesState {
    widgetStarter: WidgetStarterState;
}

export default modules;
