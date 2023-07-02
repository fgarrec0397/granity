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
    children: (
        props: DroppableChildrenProps<RefType>,
        snapshot: DroppableSnapshot,
        placeholder: JSX.Element
    ) => JSX.Element;
};

export type DroppableChildrenProps<RefType extends HTMLElement> = {
    ref: RefObject<RefType>;
    style: React.CSSProperties;
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
    placeholderSize: number;
    hasDraggedItem: boolean;
    isShallowDropTarget: boolean;
};

const containerStyle = { transition: "height 0.3s" };

export const Droppable = <RefType extends HTMLElement = HTMLDivElement>(
    props: DroppableProps<RefType>
) => {
    const [threesholdIndex, setThreesholdIndex] = useState(-1);
    const [threesholdId, setThreesholdId] = useState("");
    const [dropType, setDropType] = useState<"move" | "combine">("move");
    const [destinationItem, setDestination] = useState<DropResultItem>();
    const [draggingStatus, setDraggingStatus] = useState<DraggingStatus>();

    const ref = useRef<RefType>(null);

    const [
        { isDropTarget, placeholderSize, hasDraggedItem, sameSource, isShallowDropTarget },
        drop,
    ] = useDrop<DragItem, DropResult, CollectedProps>({
        accept: props.accept,
        collect(monitor) {
            const isMonitorShallowDropTarget = monitor.isOver({ shallow: true });
            const element = ref.current;

            const nestedDropTarget = element?.querySelector(`[data-shallow-drop-target="true"]`);

            const dropTarget =
                isMonitorShallowDropTarget || (!nestedDropTarget && monitor.isOver());

            const draggedItem = monitor.getItem();

            const isSameSource = draggedItem && draggedItem?.parentId === props.id;

            const rect = draggedItem?.__rect__ as DOMRect;
            const marginDeltaHeight = Math.max(draggedItem?.margin.top, draggedItem?.margin.bottom);
            const marginDeltaWidth = Math.max(draggedItem?.margin.left, draggedItem?.margin.right);

            const marginDelta = props.horizontal ? marginDeltaWidth : marginDeltaHeight;
            const size = props.horizontal ? rect?.width : rect?.height;

            const displayPlaceholder = dropTarget && !isSameSource;

            // const placeholderItemSize = displayPlaceholder ? size + marginDelta : 0;
            const placeholderItemSize = displayPlaceholder ? 37 : 0;

            return {
                isDropTarget: dropTarget,
                sameSource: isSameSource,
                placeholderSize: placeholderItemSize,
                hasDraggedItem: !!draggedItem,
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
        };
    }, [
        threesholdIndex,
        threesholdId,
        isDropTarget,
        props.id,
        getAcceptTypes,
        dropType,
        draggingStatus,
        destinationItem,
    ]);

    const placeholderSizeType = props.horizontal ? "width" : "height";
    const placeholderTransition = hasDraggedItem
        ? `${placeholderSizeType} 0.3s`
        : `${placeholderSizeType} 0.1ms`;
    const placeholder = useMemo(
        () => (
            <div
                className={`${props.id}-placeholder`}
                style={{
                    pointerEvents: "none",
                    width: props.horizontal ? placeholderSize : "100%",
                    // height: props.horizontal ? "auto" : placeholderSize,
                    // border: "1px solid red",
                    transition: placeholderTransition,
                }}
            />
        ),
        [placeholderSize, props.horizontal, props.id, placeholderTransition]
    );

    const onMouseOver: MouseEventHandler<RefType> = (event) => {
        event.stopPropagation();
    };

    drop(ref.current);

    return (
        <DropContext.Provider value={dropContextValue}>
            {props.children(
                {
                    ref,
                    style: containerStyle,
                    "data-shallow-drop-target": isShallowDropTarget,
                    onMouseOver,
                },
                { isDropTarget },
                placeholder
            )}
        </DropContext.Provider>
    );
};
