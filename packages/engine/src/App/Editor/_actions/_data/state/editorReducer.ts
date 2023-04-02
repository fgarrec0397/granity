import { combineReducers } from "redux";

import editorUtilsReducer, { EditorUtilsState } from "./editorUtilsReducer";
import filesReducer, { FilesState } from "./filesReducer";

export type EditorState = {
    files: FilesState;
    utils: EditorUtilsState;
};

export default combineReducers({
    files: filesReducer,
    utils: editorUtilsReducer,
});
