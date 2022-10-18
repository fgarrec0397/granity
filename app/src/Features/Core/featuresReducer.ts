import { MapPropertiesToNonNullable } from "@app/Common/commonTypes";
import { combineReducers } from "@reduxjs/toolkit";

import { preparedReducer } from "../Widgets";

type PreparedReducer = MapPropertiesToNonNullable<typeof preparedReducer>;

export default combineReducers(preparedReducer as PreparedReducer);
