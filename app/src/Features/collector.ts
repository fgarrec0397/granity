import cameras from "@widgets/Cameras";
import geometryForms from "@widgets/GeometryForms";
import { GeometryFormsProps } from "@widgets/GeometryForms/GeometryForms";
import player from "@widgets/Player";
import { PlayerProps } from "@widgets/Player/Player";
import text from "@widgets/Text";
import { TextState } from "@widgets/Text/state/textReducer";
import { TextProps } from "@widgets/Text/Text";
import text2 from "@widgets/Text2";
import { TextState2 } from "@widgets/Text2/state/textReducer";

/**
 * Add your Widgets Props here as union types
 */
export type FeaturesWidgetsProps = GeometryFormsProps & TextProps & PlayerProps;

/**
 * Add your Widgets reducers state here
 */
export interface FeaturesState {
    textState: TextState;
    textState2: TextState2;
}

/**
 * Add your Widgets reducers here.
 * They will be exported and combined to the main reducer
 */
export const preparedReducer = {
    textState: text.reducer,
    textState2: text2.reducer,
};

export default [geometryForms, text, text2, player, cameras];
