import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

import { HistoryDictionary } from "../../editorTypes";

export interface HistoryContextModel {
    historyDictionary: HistoryDictionary;
    setHistoryDictionary: (() => void) | Dispatch<SetStateAction<HistoryDictionary>>;
    currentHistoryStateId: string;
    setCurrentHistoryStateId: (() => void) | Dispatch<SetStateAction<string>>;
}

export const defaultContext: HistoryContextModel = {
    historyDictionary: {},
    setHistoryDictionary: () => {},
    currentHistoryStateId: "",
    setCurrentHistoryStateId: () => {},
};

export const HistoryDictionaryContext = createContext<HistoryContextModel>(defaultContext);

const HistoryDictionaryContextProvider: FC = ({ children }) => {
    const [historyDictionary, setHistoryDictionary] = useState<HistoryDictionary>({});
    const [currentHistoryStateId, setCurrentHistoryStateId] = useState<string>("");

    const providerValue: HistoryContextModel = {
        historyDictionary,
        setHistoryDictionary,
        currentHistoryStateId,
        setCurrentHistoryStateId,
    };

    return (
        <HistoryDictionaryContext.Provider value={providerValue}>
            {children}
        </HistoryDictionaryContext.Provider>
    );
};

export default HistoryDictionaryContextProvider;
