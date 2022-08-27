import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

import { HistoryDictionary, HistoryItem } from "../../editorTypes";

export interface HistoryContextModel {
    historyDictionary: HistoryDictionary;
    setHistoryDictionary: (() => void) | Dispatch<SetStateAction<HistoryDictionary>>;
    currentHistoryItem?: HistoryItem;
    setCurrentHistoryItem: (() => void) | Dispatch<SetStateAction<HistoryItem | undefined>>;
    shouldAddHistoryState?: boolean;
    setShouldAddHistoryState: (() => void) | Dispatch<SetStateAction<boolean>>;
}

export const defaultContext: HistoryContextModel = {
    historyDictionary: {},
    setHistoryDictionary: () => {},
    currentHistoryItem: undefined,
    setCurrentHistoryItem: () => {},
    shouldAddHistoryState: true,
    setShouldAddHistoryState: () => {},
};

export const HistoryDictionaryContext = createContext<HistoryContextModel>(defaultContext);

const HistoryDictionaryContextProvider: FC = ({ children }) => {
    const [historyDictionary, setHistoryDictionary] = useState<HistoryDictionary>({});
    const [currentHistoryItem, setCurrentHistoryItem] = useState<HistoryItem>();
    const [shouldAddHistoryState, setShouldAddHistoryState] = useState(true);

    const providerValue: HistoryContextModel = {
        historyDictionary,
        setHistoryDictionary,
        currentHistoryItem,
        setCurrentHistoryItem,
        shouldAddHistoryState,
        setShouldAddHistoryState,
    };

    return (
        <HistoryDictionaryContext.Provider value={providerValue}>
            {children}
        </HistoryDictionaryContext.Provider>
    );
};

export default HistoryDictionaryContextProvider;
