import { AppState, useAppSelector } from "@engine/App/Core/_actions/_data/state/store";

const widgetsInfoSelector = (state: AppState) => state.widgets;

export default () =>
    useAppSelector((state) => {
        const widgetsInfoDictionary = widgetsInfoSelector(state);

        return {
            widgetsInfoDictionary: widgetsInfoDictionary.byId,
            widgetsObjectInfoIds: widgetsInfoDictionary.allIds,
        };
    });
