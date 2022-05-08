import geometryForms from "./GeometryForms";
import { GeometryFormsProps } from "./GeometryForms/GeometryForms";
import text from "./Text";
import { TextState } from "./Text/state/textReducer";
import { TextProps } from "./Text/Text";
import text2 from "./Text2";
import { TextState2 } from "./Text2/state/textReducer";

/**
 * Add your Widgets Props here as union types
 */
export type FeaturesWidgetsProps = GeometryFormsProps & TextProps;

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

export default [geometryForms, text, text2];
