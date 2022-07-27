import cameras from "@features/Widgets/Cameras";
import geometryForms from "@features/Widgets/GeometryForms";
import { GeometryFormsProps } from "@features/Widgets/GeometryForms/GeometryForms";
import player from "@features/Widgets/Player";
import { PlayerProps } from "@features/Widgets/Player/Player";
import terrain from "@features/Widgets/Terrain";
import text from "@features/Widgets/Text";
import { TextState } from "@features/Widgets/Text/state/textReducer";
import { TextProps } from "@features/Widgets/Text/Text";

/**
 * Add your Widgets Props here as union types
 */
export type FeaturesWidgetsProps = GeometryFormsProps & TextProps & PlayerProps;

/**
 * Add your Widgets reducers state here
 */
export interface FeaturesState {
    textState: TextState;
}

/**
 * Add your Widgets reducers here.
 * They will be exported and combined to the main reducer
 */
export const preparedReducer = {
    textState: text.reducer,
};

export default [geometryForms, terrain, text, player, cameras];
