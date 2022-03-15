import { combineReducers } from "@reduxjs/toolkit";
import { preparedReducer } from "./collector";
import { TextState } from "./Text/state/textReducer";
import { TextState2 } from "./Text2/state/textReducer";

export interface FeaturesState {
    textState: TextState;
    textState2: TextState2;
}

export default combineReducers<FeaturesState>(preparedReducer);
