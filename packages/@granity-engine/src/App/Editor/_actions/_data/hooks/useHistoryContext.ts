import { useContext } from "react";

import { HistoryDictionaryContext } from "../providers/HistoryContextProvider";

export default () => {
    const context = useContext(HistoryDictionaryContext);

    if (!context) {
        throw new Error("widgetsContext must be inside WidgetsProvider");
    }

    return context;
};
