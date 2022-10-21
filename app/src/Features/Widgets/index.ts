import type { CamerasProps } from "@features/Widgets/Cameras";
import type { GameControllerProps, GameControllerState } from "@features/Widgets/GameController";
import type { GeometryFormsProps } from "@features/Widgets/GeometryForms";
import type { PlayerProps } from "@features/Widgets/Player";
import type { PoopProps, PoopState } from "@features/Widgets/Poop";
import type { TerrainProps } from "@features/Widgets/Terrain";
import type { TextProps, TextState } from "@features/Widgets/Text";
import type { ToiletsProps, ToiletsState } from "@features/Widgets/Toilets";
import type { WidgetStarterProps, WidgetStarterState } from "@features/Widgets/WidgetStarter";

const widgetModules = import.meta.glob("./*/*.tsx");

for (const path in widgetModules) {
    widgetModules[path]().then((mod) => {
        console.log({ path, mod });
    });
}

/**
 * Add your Widgets Props here as union types
 */
export type FeaturesWidgetsProps = GeometryFormsProps &
    TextProps &
    PlayerProps &
    CamerasProps &
    TerrainProps &
    PoopProps &
    ToiletsProps &
    GameControllerProps &
    WidgetStarterProps;

/**
 * Add your Widgets reducers state here
 */
export interface FeaturesState {
    textState: TextState;
    toiletsState: ToiletsState;
    poopState: PoopState;
    gameControllerState: GameControllerState;
    widgetStarterState: WidgetStarterState;
}

export default [];

// export default [geometryForms, terrain, text, gameController, player, cameras, poop, toilets];
