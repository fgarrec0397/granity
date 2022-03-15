import geometryForms from "./GeometryForms";
import text from "./Text";
import text2 from "./Text2";

export const preparedReducer = {
    textState: text.reducer,
    textState2: text2.reducer,
};

export default [geometryForms, text, text2];
