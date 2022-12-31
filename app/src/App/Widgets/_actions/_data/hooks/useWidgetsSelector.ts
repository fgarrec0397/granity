import { AppState, useAppSelector } from "@app/Core/_actions/_data/state/store";
import { createSelector } from "@reduxjs/toolkit";
// import { createSelector } from "red"

const widgetsInfoSelector = (state: AppState) => state.widgets.widgetsInfoDictionary;
const currentWidgetPropertiesSelector = (state: AppState) => state.widgets.displayedInformation;

// const selectWidgets = createSelector(
//     widgetsInfoSelector,
//     currentWidgetPropertiesSelector,
//     (widgetsInfoDictionary, currentWidgetProperties) => {
//         // do something with a, b, and c, and return a result
//         console.log(widgetsInfoDictionary, "widgetsInfoDictionary");
//         console.log(currentWidgetProperties, "currentWidgetProperties");

//         return { widgetsInfoDictionary, currentWidgetProperties };
//     }
// );

export default () =>
    useAppSelector((state) => {
        const widgetsInfoDictionary = widgetsInfoSelector(state);
        const currentWidgetProperties = currentWidgetPropertiesSelector(state);
        // console.log(widgetsInfoDictionary, "widgetsInfoDictionary");

        return {
            widgetsInfoDictionary,
            currentWidgetProperties,
        };
    });
