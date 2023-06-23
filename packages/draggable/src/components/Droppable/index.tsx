import { createContext, FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDrop } from "react-dnd";

import { STORE } from "../Provider";
import { DropResult } from "../Provider/types";
import { DroppableProps } from "./types";

const onMouseOver = (e: any) => {
    e.stopPropagation();
};

export type CollectedProps = {
    isDropTarget: boolean;
    sameSource: boolean;
    placeholderSize: number;
    hasDraggedItem: boolean;
    isShallowDropTarget: boolean;
};

const containerStyle = { transition: "height 0.3s" };

export const Droppable: FC<DroppableProps> = (props) => {
    const [threesholdIndex, setThreesholdIndex] = useState(-1);
    const [threesholdId, setThreesholdId] = useState("");

    const ref = useRef();

    const [
        { isDropTarget, placeholderSize, hasDraggedItem, sameSource, isShallowDropTarget },
        dropRef,
    ] = useDrop<any, DropResult, CollectedProps>({
        accept: props.accept,
        collect(monitor) {
            const isMonitorShallowDropTarget = monitor.isOver({ shallow: true });
            const element = ref.current as any;

            const nestedDropTarget = element?.querySelector(`[data-shallow-drop-target="true"]`);

            const dropTarget =
                isMonitorShallowDropTarget || (!nestedDropTarget && monitor.isOver());
            const draggedItem = monitor.getItem();
            const isSameSource = draggedItem && draggedItem?.droppableId === props.id;

            const rect = draggedItem?.__rect__ as DOMRect;
            const marginDeltaHeight = Math.max(draggedItem?.margin.top, draggedItem?.margin.bottom);
            const marginDeltaWidth = Math.max(draggedItem?.margin.left, draggedItem?.margin.right);

            const marginDelta = props.horizontal ? marginDeltaWidth : marginDeltaHeight;
            const size = props.horizontal ? rect?.width : rect?.height;
            const placeholderItemSize = dropTarget && !isSameSource ? size + marginDelta : 0;

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
                    droppableId: draggedItem.droppableId,
                },
                destination: {
                    index: threesholdIndex,
                    id: threesholdId,
                    droppableId: props.id,
                },
                dropType: "replace",
                sameSource: draggedItem.droppableId === props.id,
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
    const [dropContext] = useState(() =>
        createContext({
            setThreesholdIndex,
            threesholdIndex,
            setThreesholdId,
            threesholdId,
            isDropTarget,
            id: props.id,
            getAcceptTypes,
        })
    );

    if (!STORE.droppables[props.id]) {
        STORE.droppables[props.id] = { context: dropContext };
    }

    useEffect(() => {
        return () => {
            delete STORE.droppables[props.id];
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
        };
    }, [threesholdId, threesholdIndex, isDropTarget, props.id, getAcceptTypes]);

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
                    height: props.horizontal ? "auto" : placeholderSize,
                    transition: placeholderTransition,
                }}
            />
        ),
        [placeholderSize, props.horizontal, props.id, placeholderTransition]
    );

    const innerRef = (element: any) => {
        ref.current = element;
        dropRef(element);
    };

    return (
        <dropContext.Provider value={dropContextValue}>
            {props.children(
                {
                    ref: innerRef,
                    style: containerStyle,
                    "data-shallow-drop-target": isShallowDropTarget,
                    onMouseOver,
                },
                { isDropTarget },
                placeholder
            )}
        </dropContext.Provider>
    );
};
