import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

import { HistoryDictionary, HistoryItem } from "../../editorTypes";

export interface HistoryContextModel {
    historyDictionary: HistoryDictionary;
    setHistoryDictionary: (() => void) | Dispatch<SetStateAction<HistoryDictionary>>;
    currentHistoryItem?: HistoryItem;
    setCurrentHistoryItem: (() => void) | Dispatch<SetStateAction<HistoryItem | undefined>>;
}

export const defaultContext: HistoryContextModel = {
    historyDictionary: {},
    setHistoryDictionary: () => {},
    currentHistoryItem: undefined,
    setCurrentHistoryItem: () => {},
};

export const HistoryDictionaryContext = createContext<HistoryContextModel>(defaultContext);

const HistoryDictionaryContextProvider: FC = ({ children }) => {
    const [historyDictionary, setHistoryDictionary] = useState<HistoryDictionary>({});
    const [currentHistoryItem, setCurrentHistoryItem] = useState<HistoryItem>();

    const providerValue: HistoryContextModel = {
        historyDictionary,
        setHistoryDictionary,
        currentHistoryItem,
        setCurrentHistoryItem,
    };

    return (
        <HistoryDictionaryContext.Provider value={providerValue}>
            {children}
        </HistoryDictionaryContext.Provider>
    );
};

export default HistoryDictionaryContextProvider;
