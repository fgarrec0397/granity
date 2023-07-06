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

export type CollectProps = { isOver: boolean; style: SxProps | undefined };

const Draggable = <RefType extends HTMLElement>({
    dragItem: currentItem,
    children,
}: DraggableProps<RefType>) => {
    const ref = useRef<RefType>(null);
    const { itemsDictionaryIds, onDrop, onMove } = useDndContext();

    const {
        threesholdIndex,
        previousThreesholdIndex,
        threesholdId,
        dropType,
        setThreesholdIndex,
        setThreesholdId,
        setDropType,
        setDraggingStatus,
        draggingStatus,
        getAcceptTypes,
        isDropTarget: isParentActive,
        destinationItem,
        setDestination,
        hasDropped,
        setHasDropped,
    } = useDroppableContext(currentItem.parentId);

    const [{ isOver, style }, drop] = useDrop<DragItem, DropResult, CollectProps>({
        accept: getAcceptTypes(),
        collect(monitor) {
            const sourceItem = monitor.getItem();

            const itemStyle = handleStyle(monitor, {
                sourceItem: sourceItem,
                destinationItem: currentItem,
                threesholdIndex,
                dropType,
                ref,
                draggingStatus,
                hasDropped,
            });

            return {
                isOver: monitor.isOver(),
                style: itemStyle,
            };
        },

        drop(_, monitor) {
            const item = monitor.getItem();

            if (!item) return;

            const isDropTarget = monitor.isOver({ shallow: true });

            if (!isDropTarget) return;

            setHasDropped(true);

            return {
                source: {
                    index: item.index,
                    id: item.id,
                    parentId: item.parentId,
                    path: item.path,
                    title: item.title,
                },
                destination: destinationItem,
                draggingStatus,
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
                previousThreesholdIndex,
                threesholdIndex,
                setDropType,
                dropType,
                setDraggingStatus,
                itemsDictionaryIds,
                setDestination,
                hasDropped,
                setHasDropped,
            });
        },
    });

    const [{ isDragging, draggedItem }, drag, preview] = useDrag<
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

            return {
                isDragging: sourceIsDragging,
                draggedItem: sourceItem,
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
    const indexMismatch =
        isParentActive && threesholdIndex !== currentItem.index && threesholdId === currentItem.id;

    const isDraggingSrouce =
        isDragging &&
        draggedItem?.index === currentItem.index &&
        draggedItem?.parentId === currentItem.parentId;

    useEffect(() => {
        if (idMismatch) {
            setThreesholdId(currentItem.id);
        }
    }, [idMismatch, setThreesholdId, currentItem.id]);

    useEffect(() => {
        if (indexMismatch) {
            setThreesholdId(undefined as any);
        }
    }, [indexMismatch, setThreesholdId, currentItem.id]);

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
