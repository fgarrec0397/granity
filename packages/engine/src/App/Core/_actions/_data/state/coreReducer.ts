import { App, FetchStatus, FilesData } from "@engine/App/Core/_actions/coreTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { rootFolderName } from "../../coreConstants";

export interface CoreState {
    app: App | null;
    status: FetchStatus;
    pathToLoadFiles: string;
    filesData: FilesData;
    filesStatus: FetchStatus;
}

const initialState: CoreState = {
    app: null,
    status: "loading",
    pathToLoadFiles: rootFolderName,
    filesData: {
        currentRootPath: "",
        files: [],
        folders: [],
    },
    filesStatus: "loading",
};

export const coreSlice = createSlice({
    name: "core",
    initialState,
    reducers: {
        setApp: (state: CoreState, actions: PayloadAction<CoreState["app"]>) => {
            state.app = actions.payload;
        },
        setStatus: (state: CoreState, actions: PayloadAction<CoreState["status"]>) => {
            const status = actions.payload;

            state.status = status;
        },
        setPathToLoadFiles: (state: CoreState, actions: PayloadAction<string>) => {
            state.pathToLoadFiles = actions.payload;
        },
        setFilesData: (state: CoreState, actions: PayloadAction<FilesData>) => {
            state.filesData = actions.payload;
        },
        setFilesStatus: (state: CoreState, actions: PayloadAction<FetchStatus>) => {
            state.status = actions.payload;
        },
    },
});

export const { setApp, setStatus, setPathToLoadFiles, setFilesData, setFilesStatus } =
    coreSlice.actions;

export default coreSlice.reducer;
