import { AppState, useAppSelector } from "@app/Core/_actions/_data/state/store";
import { createSelector } from "@reduxjs/toolkit";

const widgetsInfoSelector = (state: AppState) => state.widgets.widgetsObjectInfoDictionary;
const displayedInformationSelector = (state: AppState) => state.widgets.displayedInformation;

const selectWidgets = createSelector(widgetsInfoSelector, (widgetsObjectInfoDictionary) => {
    return widgetsObjectInfoDictionary;
});

export default () =>
    useAppSelector((state) => {
        const widgetsObjectInfoDictionary = selectWidgets(state);
        const displayedInformations = displayedInformationSelector(state);

        return {
            widgetsObjectInfoDictionary: widgetsObjectInfoDictionary.widgetsObjectInfoDictionary,
            currentWidgetProperties: displayedInformations.currentWidgetProperties,
        };
    });
