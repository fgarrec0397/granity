import { combineReducers } from "redux";

import displayedInformationReducer, {
    DisplayedInformationsState,
} from "./displayedInformationReducer";
import widgetsInfoDictionaryReducer, {
    WidgetObjectInfoDictionaryState,
} from "./widgetsInfoDictionaryReducer";

export type WidgetsStateV2 = {
    displayedInformation: DisplayedInformationsState;
    widgetsObjectInfoDictionary: WidgetObjectInfoDictionaryState;
};

export default combineReducers({
    displayedInformation: displayedInformationReducer,
    widgetsObjectInfoDictionary: widgetsInfoDictionaryReducer,
});
