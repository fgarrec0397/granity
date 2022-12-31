import { combineReducers } from "redux";

import displayedInformationReducer, {
    DisplayedInformationsState,
} from "./displayedInformationReducer";
import widgetsInfoDictionaryReducer, {
    WidgetsInfoDictionaryState,
} from "./widgetsInfoDictionaryReducer";

export type WidgetsStateV2 = {
    displayedInformation: DisplayedInformationsState;
    widgetsInfoDictionary: WidgetsInfoDictionaryState;
};

export default combineReducers({
    displayedInformation: displayedInformationReducer,
    widgetsInfoDictionary: widgetsInfoDictionaryReducer,
});
