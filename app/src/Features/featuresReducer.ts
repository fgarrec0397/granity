import { MapPropertiesToNonNullable } from "@common/commonTypes";
import { combineReducers } from "@reduxjs/toolkit";

import { FeaturesState, preparedReducer } from "./collector";

type PreparedReducer = MapPropertiesToNonNullable<typeof preparedReducer>;

export default combineReducers<FeaturesState>(preparedReducer as PreparedReducer);
