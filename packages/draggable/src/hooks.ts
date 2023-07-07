import { useContext } from "react";

import { DndContext } from "./DndContextProvider";

export const useDndContext = () => {
    return useContext(DndContext);
};
