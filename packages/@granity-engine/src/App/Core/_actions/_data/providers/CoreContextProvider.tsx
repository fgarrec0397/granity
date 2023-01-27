import { HasChildren } from "@granity/helpers";
import { createContext, Dispatch, FC, useReducer } from "react";

import { EngineOptions } from "../../coreTypes";

export type CoreContextModel = [CoreReducerState, Dispatch<CoreReducerAction>];

export const CoreContext = createContext<CoreContextModel>([{ onSave: () => {} }, () => {}]);

export enum CoreAction {
    ON_SAVE = "ON_SAVE",
}

type CoreReducerAction = {
    type: CoreAction;
    payload?: () => void;
};

type CoreReducerState = {
    onSave: EngineOptions["onSave"];
};

const reducer = (state: CoreReducerState, action: CoreReducerAction) => {
    switch (action.type) {
        case "ON_SAVE":
            return { onSave: action.payload };
        default:
            return state;
    }
};

type Props = HasChildren;
const CoreContextProvider: FC<Props> = ({ children }) => {
    const coreReducer = useReducer(reducer, { onSave: () => {} });

    return <CoreContext.Provider value={coreReducer}>{children}</CoreContext.Provider>;
};

export default CoreContextProvider;
