import { AppState, useAppSelector } from "@app/Core/_actions/_data/state/store";
import { createSelector } from "@reduxjs/toolkit";

const widgetsInfoSelector = (state: AppState) => state.widgets.widgetsInfoDictionary;
const displayedInformationSelector = (state: AppState) => state.widgets.displayedInformation;

const selectWidgets = createSelector(widgetsInfoSelector, (widgetsInfoDictionary) => {
    return widgetsInfoDictionary;
});

export default () =>
    useAppSelector((state) => {
        const widgetsInfoDictionary = selectWidgets(state);
        const displayedInformations = displayedInformationSelector(state);

        return {
            widgetsInfoDictionary: widgetsInfoDictionary.widgetsInfoDictionary,
            currentWidgetProperties: displayedInformations.currentWidgetProperties,
        };
    });
