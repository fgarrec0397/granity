import { Context, createContext, FC, ReactNode, useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { OnDrop, OnMove } from "../types";

type ProviderProps = {
    onDrop: OnDrop;
    onMove?: OnMove;
    children?: ReactNode;
};

type DndContextModel = {
    onDrop: OnDrop;
    onMove?: OnMove;
};

const defaultValue: DndContextModel = {
    onDrop: () => {},
};

const DndContext = createContext<DndContextModel>(defaultValue);

const droppablesDictionary = {} as {
    [id: string]: {
        context: Context<{
            threesholdIndex: number;
            setThreesholdIndex: React.Dispatch<React.SetStateAction<number>>;
            threesholdId: string;
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

const DndContextProvider: FC<ProviderProps> = ({ onDrop, onMove, children }) => {
    const providerValue: DndContextModel = {
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
