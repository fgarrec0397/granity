import { usePrevious } from "@granity/helpers";
import {
    createContext,
    MouseEventHandler,
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useDrop } from "react-dnd";

import { DraggingStatus, droppablesDictionary } from "../Provider/DndContextProvider";
import { DragItem, DropResult, DropResultItem } from "../types";

export type DroppableProps<RefType extends HTMLElement> = {
    id: string;
    parentId?: string;
    index?: number;
    accept: string[];
    horizontal?: boolean;
    path?: string;
    children: (props: DroppableChildrenProps<RefType>, snapshot: DroppableSnapshot) => JSX.Element;
};

export type DroppableChildrenProps<RefType extends HTMLElement> = {
    ref: RefObject<RefType>;
    onMouseOver: MouseEventHandler<RefType>;
    // true if the droppable element is the real target
    "data-shallow-drop-target": boolean;
};

export type DroppableSnapshot = {
    isDropTarget: boolean;
};

export type CollectedProps = {
    isDropTarget: boolean;
    sameSource: boolean;
    isShallowDropTarget: boolean;
};

export const Droppable = <RefType extends HTMLElement = HTMLDivElement>(
    props: DroppableProps<RefType>
) => {
    const [hasDropped, setHasDropped] = useState(true);
    const [threesholdIndex, setThreesholdIndex] = useState(-1);
    const tempPreviousThreesholdIndex = usePrevious(threesholdIndex);
    const previousThreesholdIndex = usePrevious(threesholdIndex, (ref) => {
        if (ref.current === undefined) {
            ref.current = threesholdIndex;
        }

        const shouldUpdatePreviousValueWhileDraggingDown = threesholdIndex - ref.current > 1;
        const shouldUpdatePreviousValueWhileDraggingUp = threesholdIndex - ref.current < -1;
        const shouldUpdatePreviousValueWhileDraggingBack = threesholdIndex - ref.current === 0;

        if (shouldUpdatePreviousValueWhileDraggingDown) {
            return threesholdIndex - 1;
        }

        if (shouldUpdatePreviousValueWhileDraggingUp) {
            return threesholdIndex + 1;
        }

        if (shouldUpdatePreviousValueWhileDraggingBack) {
            if (tempPreviousThreesholdIndex === undefined) {
                return;
            }

            const hasDraggedBackFromDown = tempPreviousThreesholdIndex > threesholdIndex;
            const hasDraggedBackFromUp = tempPreviousThreesholdIndex < threesholdIndex;

            if (hasDraggedBackFromDown) {
                return threesholdIndex + 1;
            }

            if (hasDraggedBackFromUp) {
                return threesholdIndex - 1;
            }
        }

        return ref.current;
    });

    const [threesholdId, setThreesholdId] = useState("");
    const [dropType, setDropType] = useState<"move" | "combine">("move");
    const [destinationItem, setDestination] = useState<DropResultItem>();
    const [draggingStatus, setDraggingStatus] = useState<DraggingStatus>();

    const ref = useRef<RefType>(null);

    const [{ isDropTarget, sameSource, isShallowDropTarget }, drop] = useDrop<
        DragItem,
        DropResult,
        CollectedProps
    >({
        accept: props.accept,
        collect(monitor) {
            const isMonitorShallowDropTarget = monitor.isOver({ shallow: true });
            const element = ref.current;

            const nestedDropTarget = element?.querySelector(`[data-shallow-drop-target="true"]`);

            const dropTarget =
                isMonitorShallowDropTarget || (!nestedDropTarget && monitor.isOver());

            const draggedItem = monitor.getItem();

            const isSameSource = draggedItem && draggedItem?.parentId === props.id;

            return {
                isDropTarget: dropTarget,
                sameSource: isSameSource,
                isShallowDropTarget: isMonitorShallowDropTarget,
            };
        },

        drop(_, monitor) {
            const draggedItem = monitor.getItem();
            if (!draggedItem) return;

            const dropTarget = monitor.isOver({ shallow: true });
            if (!dropTarget) return;

            if (monitor.didDrop()) return;

            return {
                source: {
                    index: draggedItem.index,
                    id: draggedItem.id,
                    parentId: draggedItem.parentId,
                    path: draggedItem.path,
                },
                destination: {
                    index: threesholdIndex,
                    id: props.id,
                    parentId: props.parentId,
                    path: props.path || "root",
                },
                dropType: "droppable",
                sameSource: draggedItem.parentId === props.id,
            };
        },
    });

    const isDropTargetDifferentSources = isDropTarget && sameSource === false;
    useEffect(() => {
        // set initial threeshold index in case of cross container
        if (threesholdIndex === -1 && isDropTargetDifferentSources) {
            setThreesholdIndex(0);
        }
    }, [isDropTargetDifferentSources, threesholdIndex]);

    const acceptRef = useRef(props.accept);
    acceptRef.current = props.accept;

    const getAcceptTypes = useCallback(() => acceptRef.current, []);

    // create new context for the droppable zone
    const [DropContext] = useState(() =>
        createContext({
            setThreesholdIndex,
            threesholdIndex,
            previousThreesholdIndex,
            setThreesholdId,
            threesholdId,
            isDropTarget,
            id: props.id,
            getAcceptTypes,
            dropType,
            setDropType,
            draggingStatus,
            setDraggingStatus,
            destinationItem,
            setDestination,
            hasDropped,
            setHasDropped,
        })
    );

    if (!droppablesDictionary[props.id]) {
        droppablesDictionary[props.id] = { context: DropContext };
    }

    useEffect(() => {
        return () => {
            delete droppablesDictionary[props.id];
        };
    }, [props.id]);

    const dropContextValue = useMemo(() => {
        return {
            setThreesholdIndex,
            threesholdIndex,
            previousThreesholdIndex,
            setThreesholdId,
            threesholdId,
            isDropTarget,
            id: props.id,
            getAcceptTypes,
            dropType,
            setDropType,
            draggingStatus,
            setDraggingStatus,
            destinationItem,
            setDestination,
            hasDropped,
            setHasDropped,
        };
    }, [
        threesholdIndex,
        previousThreesholdIndex,
        threesholdId,
        isDropTarget,
        props.id,
        getAcceptTypes,
        dropType,
        draggingStatus,
        destinationItem,
        hasDropped,
    ]);

    const onMouseOver: MouseEventHandler<RefType> = (event) => {
        event.stopPropagation();
    };

    drop(ref.current);

    return (
        <DropContext.Provider value={dropContextValue}>
            {props.children(
                {
                    ref,
                    "data-shallow-drop-target": isShallowDropTarget,
                    onMouseOver,
                },
                { isDropTarget }
            )}
        </DropContext.Provider>
    );
};
