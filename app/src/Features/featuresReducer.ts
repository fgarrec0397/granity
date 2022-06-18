import { combineReducers } from "@reduxjs/toolkit";
import { MapPropertiesToNonNullable } from "@common/commonTypes";
import { FeaturesState, preparedReducer } from "./collector";

type PreparedReducer = MapPropertiesToNonNullable<typeof preparedReducer>;

export default combineReducers<FeaturesState>(preparedReducer as PreparedReducer);
