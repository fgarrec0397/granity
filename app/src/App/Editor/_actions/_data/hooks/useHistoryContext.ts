import { useContext } from "react";

import { HistoryDictionaryContext } from "../providers/HistoryContextProvider";

export default () => {
    return useContext(HistoryDictionaryContext);
};
