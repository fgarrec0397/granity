import { Context, createContext, FC, ReactNode, useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { OnDrop } from "../types";

type ProviderProps = {
    onDrop: OnDrop;
    children?: ReactNode;
};

const DndContext = createContext<OnDrop>(() => {});

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

const useOnDrop = () => {
    return useContext(DndContext);
};

const useDroppableContext = (droppableId: string) => {
    return useContext(droppablesDictionary[droppableId].context || {});
};

const DndContextProvider: FC<ProviderProps> = (props) => {
    return (
        <DndContext.Provider value={props.onDrop}>
            <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>
        </DndContext.Provider>
    );
};

export { DndContextProvider, droppablesDictionary, useDroppableContext, useOnDrop };
