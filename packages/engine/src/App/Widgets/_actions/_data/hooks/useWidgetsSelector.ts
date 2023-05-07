import { AppState, useAppSelector } from "@engine/App/Core/_actions/_data/state/store";

const widgetsInfoSelector = (state: AppState) => state.widgets;

export default () =>
    useAppSelector((state) => {
        const widgetsObjectInfoDictionary = widgetsInfoSelector(state);

        return {
            widgetsObjectInfoDictionary: widgetsObjectInfoDictionary.byId,
            widgetsObjectInfoIds: widgetsObjectInfoDictionary.allIds,
        };
    });
