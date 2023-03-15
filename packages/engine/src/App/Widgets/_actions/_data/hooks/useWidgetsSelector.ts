import { AppState, useAppSelector } from "@engine/App/Core/_actions/_data/state/store";

const widgetsInfoSelector = (state: AppState) => state.widgets.widgetsObjectInfoDictionary;
const displayedInformationSelector = (state: AppState) => state.widgets.displayedInformation;

export default () =>
    useAppSelector((state) => {
        const widgetsObjectInfoDictionary = widgetsInfoSelector(state);
        const displayedInformations = displayedInformationSelector(state);

        return {
            widgetsObjectInfoDictionary: widgetsObjectInfoDictionary.byId,
            widgetsObjectInfoIds: widgetsObjectInfoDictionary.allIds,
            widgetPropertiesUI: displayedInformations.propertiesUI,
        };
    });
