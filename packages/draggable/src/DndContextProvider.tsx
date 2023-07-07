import { RecursiveArrayOfIds } from "@granity/helpers";
import { createContext, FC, ReactNode } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { OnDrop, OnMove } from "./types";

type ProviderProps = {
    itemsDictionaryIds: RecursiveArrayOfIds<string>;
    onDrop: OnDrop;
    onMove?: OnMove;
    children?: ReactNode;
};

type DndContextModel = {
    itemsDictionaryIds: RecursiveArrayOfIds<string>;
    onDrop: OnDrop;
    onMove?: OnMove;
};

const defaultValue: DndContextModel = {
    itemsDictionaryIds: [],
    onDrop: () => {},
};

export const DndContext = createContext<DndContextModel>(defaultValue);

export type DraggingStatus = {
    draggingDirection: "upward" | "downward";
    draggingType: "canMoveNext" | "canMovePrev" | "canCombine";
};

const DndContextProvider: FC<ProviderProps> = ({
    itemsDictionaryIds,
    onDrop,
    onMove,
    children,
}) => {
    const providerValue: DndContextModel = {
        itemsDictionaryIds,
        onDrop,
        onMove,
    };

    return (
        <DndContext.Provider value={providerValue}>
            <DndProvider backend={HTML5Backend}>{children}</DndProvider>
        </DndContext.Provider>
    );
};

export default DndContextProvider;
