import { usePrevious } from "@granity/helpers";
import { SxProps } from "@granity/ui";
import { RefObject, useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { DraggingStatus } from "./DndContextProvider";
import { useDndContext } from "./hooks";
import {
    DragAndDropSnapshot,
    DragCollectProps,
    DragItem,
    DropCollectProps,
    DropResult,
    DropResultItem,
} from "./types";
import { getElementMargin, handleHover, handleStyle } from "./utils";

export type DraggableChildrenProp<RefType extends HTMLElement> = {
    ref: RefObject<RefType>;
    style?: SxProps;
};

export type DragAndDropProps<RefType extends HTMLElement> = {
    dragItem: DragItem;
    accept: string[];
    children: (props: DraggableChildrenProp<RefType>, snapshot: DragAndDropSnapshot) => JSX.Element;
};

const DragAndDrop = <RefType extends HTMLElement = HTMLDivElement>({
    dragItem: currentItem,
    accept,
    children,
}: DragAndDropProps<RefType>) => {
    const ref = useRef<RefType>(null);

    const [hasDropped, setHasDropped] = useState(true);
    const [threesholdIndex, setThreesholdIndex] = useState(-1);
    const [threesholdId, setThreesholdId] = useState("");
    const [dropType, setDropType] = useState<"move" | "combine">("move");
    const [destinationItem, setDestination] = useState<DropResultItem>();
    const [draggingStatus, setDraggingStatus] = useState<DraggingStatus>();

    const { itemsDictionaryIds, onDrop, onMove } = useDndContext();

    const tempPreviousThreesholdIndex = usePrevious(threesholdIndex);
    const previousThreesholdIndex = usePrevious(threesholdIndex, (prevRef) => {
        if (prevRef.current === undefined) {
            prevRef.current = threesholdIndex;
        }

        const shouldUpdatePreviousValueWhileDraggingDown = threesholdIndex - prevRef.current > 1;
        const shouldUpdatePreviousValueWhileDraggingUp = threesholdIndex - prevRef.current < -1;
        const shouldUpdatePreviousValueWhileDraggingBack = threesholdIndex - prevRef.current === 0;

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

        return prevRef.current;
    });

    const [{ isOver, style, isDropTarget }, drop] = useDrop<DragItem, DropResult, DropCollectProps>(
        {
            accept,
            collect(monitor) {
                const sourceItem = monitor.getItem();
                const isMonitorShallowDropTarget = monitor.isOver({ shallow: true });
                const element = ref.current;

                const nestedDropTarget = element?.querySelector(
                    `[data-shallow-drop-target="true"]`
                );

                const dropTarget =
                    isMonitorShallowDropTarget || (!nestedDropTarget && monitor.isOver());

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
                    isDropTarget: dropTarget,
                };
            },

            drop(_, monitor) {
                const item = monitor.getItem();

                if (!item) return;

                const dropTarget = monitor.isOver({ shallow: true });

                if (!dropTarget) return;

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
        }
    );

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

    const isDestination = isDropTarget && threesholdIndex === currentItem.index;
    const idMismatch = isDestination && threesholdId !== currentItem.id;
    const indexMismatch =
        isDropTarget && threesholdIndex !== currentItem.index && threesholdId === currentItem.id;

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

export default DragAndDrop;
