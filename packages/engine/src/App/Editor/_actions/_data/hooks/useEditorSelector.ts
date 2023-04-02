import { AppState, useAppSelector } from "@engine/App/Core/_actions/_data/state/store";

const filesSelector = (state: AppState) => state.editor.files;
const utilsSelector = (state: AppState) => state.editor.utils;

export default () =>
    useAppSelector((state) => {
        return {
            ...{
                ...filesSelector(state),
                filesDataStatus: filesSelector(state).status,
            },
            ...utilsSelector(state),
        };
    });
