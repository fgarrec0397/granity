import { AppState, useAppSelector } from "@engine/App/Core/_actions/_data/state/store";

const scenesSelector = (state: AppState) => state.scenes.byId;
const scenesIdsSelector = (state: AppState) => state.scenes.allIds;
const scenesStatusSelector = (state: AppState) => state.scenes.status;
const currentSceneIdSelector = (state: AppState) => state.scenes.currentSceneId;
const currentDefaultSceneIdSelector = (state: AppState) => state.scenes.currentDefaultSceneId;

export default () => {
    return useAppSelector((state) => {
        const scenes = scenesSelector(state);
        const scenesIds = scenesIdsSelector(state);
        const scenesStatus = scenesStatusSelector(state);
        const currentSceneId = currentSceneIdSelector(state);
        const currentDefaultSceneId = currentDefaultSceneIdSelector(state);

        return {
            scenes,
            scenesIds,
            scenesStatus,
            currentSceneId,
            currentDefaultSceneId,
        };
    });
};
