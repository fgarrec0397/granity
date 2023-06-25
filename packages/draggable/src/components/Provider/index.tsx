import { Context, createContext, useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { OnDrop, ProviderProps } from "./types";

const ONDROP_CTX = createContext<OnDrop>(() => {});

const STORE = {
    droppables: {} as {
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
    },
};

const useOnDrop = () => {
    return useContext(ONDROP_CTX);
};

const useDroppableContext = (droppableId: string) => {
    return useContext(STORE.droppables[droppableId].context || {});
};

const DndCtxProvider = ONDROP_CTX.Provider;

const Provider: React.FC<ProviderProps> = (props) => {
    return (
        <DndCtxProvider value={props.onDrop}>
            <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>
        </DndCtxProvider>
    );
};

export { Provider, STORE, useDroppableContext, useOnDrop };
