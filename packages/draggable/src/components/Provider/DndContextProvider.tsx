import { RecursiveArrayOfIds } from "@granity/helpers";
import { Context, createContext, FC, ReactNode, useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { DropResultItem, OnDrop, OnMove } from "../types";

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

const DndContext = createContext<DndContextModel>(defaultValue);

export type DraggingStatus = {
    draggingDirection: "upward" | "downward";
    draggingType: "canMoveNext" | "canMovePrev" | "canCombine";
};

const droppablesDictionary = {} as {
    [id: string]: {
        context: Context<{
            threesholdIndex: number;
            previousThreesholdIndex: number | undefined;
            setThreesholdIndex: React.Dispatch<React.SetStateAction<number>>;
            threesholdId: string;
            dropType: "combine" | "move";
            hasDropped: boolean;
            draggingStatus: DraggingStatus | undefined;
            destinationItem: DropResultItem | undefined;
            setHasDropped: React.Dispatch<React.SetStateAction<boolean>>;
            setDestination: React.Dispatch<React.SetStateAction<DropResultItem | undefined>>;
            setDropType: React.Dispatch<React.SetStateAction<"combine" | "move">>;
            setDraggingStatus: React.Dispatch<React.SetStateAction<DraggingStatus | undefined>>;
            setThreesholdId: React.Dispatch<React.SetStateAction<string>>;
            isDropTarget: boolean;
            id: string;
            getAcceptTypes: () => string[];
        }>;
    };
};

const useDndContext = () => {
    return useContext(DndContext);
};

const useDroppableContext = (parentId: string) => {
    return useContext(droppablesDictionary[parentId].context || {});
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

export { DndContextProvider, droppablesDictionary, useDndContext, useDroppableContext };
