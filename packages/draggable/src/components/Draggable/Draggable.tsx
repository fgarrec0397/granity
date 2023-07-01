import { SxProps } from "@granity/ui";
import { RefObject, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { useDndContext, useDroppableContext } from "../Provider/DndContextProvider";
import { DragCollectProps, DraggableSnapshot, DragItem, DragItemRaw, DropResult } from "../types";
import { getElementMargin, handleHover, handleStyle } from "./utils";

export type DraggableChildrenProp<RefType extends HTMLElement> = {
    ref: RefObject<RefType>;
    style?: SxProps;
};

export type DraggableProps<RefType extends HTMLElement> = {
    dragItem: DragItemRaw;
    children: (props: DraggableChildrenProp<RefType>, snapshot: DraggableSnapshot) => JSX.Element;
};

const Draggable = <RefType extends HTMLElement>({
    dragItem: currentItem,
    children,
}: DraggableProps<RefType>) => {
    const ref = useRef<RefType>(null);
    const { onDrop, onMove } = useDndContext();

    const {
        threesholdIndex,
        threesholdId,
        dropType,
        setThreesholdIndex,
        setThreesholdId,
        setDropType,
        setDraggingStatus,
        draggingStatus,
        getAcceptTypes,
        isDropTarget: isParentActive,
    } = useDroppableContext(currentItem.parentId);

    const [{ isOver }, drop] = useDrop<DragItem, DropResult, { isOver: boolean }>({
        accept: getAcceptTypes(),
        collect(monitor) {
            return {
                isOver: monitor.isOver(),
            };
        },

        drop(_, monitor) {
            const item = monitor.getItem();

            if (!item) return;

            const isDropTarget = monitor.isOver({ shallow: true });

            if (!isDropTarget) return;

            return {
                source: {
                    index: item.index,
                    id: item.id,
                    parentId: item.parentId,
                    path: item.path,
                    title: item.title,
                },
                destination: {
                    index: threesholdIndex,
                    id: currentItem.id,
                    parentId: currentItem.parentId,
                    path: currentItem.path,
                    title: currentItem.title,
                },
                dropType,
                sameSource: draggedItem.parentId === currentItem.parentId,
            };
        },

        hover(item, monitor) {
            if (onMove) {
                return onMove(item, currentItem);
            }

            handleHover(monitor, {
                sourceItem: item,
                destinationItem: currentItem,
                ref,
                setThreesholdIndex,
                threesholdIndex,
                setDropType,
                dropType,
                setDraggingStatus,
            });
        },
    });

    const [{ isDragging, draggedItem, style }, drag, preview] = useDrag<
        DragItem,
        DropResult,
        DragCollectProps
    >({
        type: currentItem.type,
        item: () => {
            const element = ref.current;
            const rect = element?.getBoundingClientRect();
            return {
                ...currentItem,
                __rect__: rect,
                margin: getElementMargin(element),
            };
        },
        collect: (monitor): DragCollectProps => {
            const sourceItem = monitor.getItem();
            const sourceIsDragging = monitor.isDragging();

            const itemStyle = handleStyle(monitor, {
                sourceItem: sourceItem,
                destinationItem: currentItem,
                threesholdIndex,
                domRect: sourceItem?.__rect__,
                isDragging: sourceIsDragging,
                isParentActive,
                margin: sourceItem?.margin,
                isOver,
                dropType,
                ref,
                draggingStatus,
            });

            return {
                isDragging: sourceIsDragging,
                draggedItem: sourceItem,
                style: itemStyle?.style,
            };
        },

        end(_, monitor) {
            if (monitor.didDrop()) {
                const result = monitor.getDropResult();

                if (result) {
                    onDrop(result);
                }
            }
        },
    });

    const isDestination = isParentActive && threesholdIndex === currentItem.index;
    const idMismatch = isDestination && threesholdId !== currentItem.id;
    useEffect(() => {
        if (idMismatch) {
            setThreesholdId(currentItem.id);
        }
    }, [idMismatch, setThreesholdId, currentItem.id]);

    const indexMismatch =
        isParentActive && threesholdIndex !== currentItem.index && threesholdId === currentItem.id;

    useEffect(() => {
        if (indexMismatch) {
            setThreesholdId(undefined as any);
        }
    }, [indexMismatch, setThreesholdId, currentItem.id]);

    const isDraggingSrouce =
        isDragging &&
        draggedItem?.index === currentItem.index &&
        draggedItem?.parentId === currentItem.parentId;

    useEffect(() => {
        if (isDraggingSrouce) {
            setThreesholdIndex(currentItem.index);
            setThreesholdId(currentItem.id);
        }
    }, [isDraggingSrouce, setThreesholdIndex, setThreesholdId, currentItem.index, currentItem.id]);

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    drag(drop(ref.current));

    return (
        <div style={{ position: "relative" }}>
            {children({ ref, style }, { isDragging, isOver })}
        </div>
    );
};

export { Draggable };
