import { FC, useCallback, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { useDroppableContext, useOnDrop } from "../Provider";
import { DropResult } from "../Provider/types";
import { DragCollectProps, DraggableProps, DragItem } from "./types";
import { getElementMargin, getTranslationStyle, handleHover } from "./utils";

const Draggable: FC<DraggableProps> = ({ children, horizontal, ...props }) => {
    const ref = useRef<any>();
    const onDrop = useOnDrop();

    const {
        threesholdIndex,
        threesholdId,
        setThreesholdIndex,
        setThreesholdId,
        getAcceptTypes,
        isDropTarget: isParentActive,
    } = useDroppableContext(props.droppableId);

    const [{ isDragging, draggedItem, style }, drag, preview] = useDrag<
        DragItem,
        DropResult,
        DragCollectProps
    >({
        type: props.type,
        item: () => {
            const element = ref.current as HTMLDivElement;
            const rect = element?.getBoundingClientRect();
            return {
                ...props,
                __rect__: rect,
                margin: getElementMargin(element),
            };
        },
        collect: (monitor): DragCollectProps => {
            const sourceItem = monitor.getItem();
            const sourceIsDragging = monitor.isDragging();

            const { style } = getTranslationStyle({
                sourceItem: sourceItem,
                destinationItem: props,
                threesholdIndex,
                horizontal,
                domRect: sourceItem?.__rect__,
                isDragging: sourceIsDragging,
                isParentActive,
                margin: sourceItem?.margin,
            });

            return { isDragging: sourceIsDragging, draggedItem: sourceItem, style };
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

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    const [{ isOver }, drop] = useDrop<
        DragItem & { __rect__: DOMRect | undefined },
        { source: any; destination: any; dropType: "combine" },
        { isOver: boolean }
    >({
        accept: getAcceptTypes(),
        collect(monitor) {
            return {
                // handlerId: monitor.getHandlerId(),
                isOver: monitor.isOver(),
            };
        },

        drop(_, monitor) {
            const draggedItem = monitor.getItem() as DragItem;
            if (!draggedItem) return;

            const isDropTarget = monitor.isOver({ shallow: true });
            if (!isDropTarget) return;

            return {
                source: {
                    index: draggedItem.index,
                    id: draggedItem.id,
                    droppableId: draggedItem.droppableId,
                },
                destination: {
                    index: props.index,
                    id: props.id,
                    droppableId: props.droppableId,
                },
                dropType: "combine",
                sameSource: draggedItem.droppableId === props.droppableId,
            };
        },

        hover(draggedItem, monitor) {
            handleHover(monitor, {
                sourceItem: draggedItem,
                destinationItem: props,
                ref,
                setThreesholdIndex,
                threesholdIndex,
                horizontal,
            });
        },
    });

    const isDestination = isParentActive && threesholdIndex === props.index;
    const idMismatch = isDestination && threesholdId !== props.id;
    useEffect(() => {
        if (idMismatch) {
            setThreesholdId(props.id);
        }
    }, [idMismatch, setThreesholdId, props.id]);

    const indexMismatch =
        isParentActive && threesholdIndex !== props.index && threesholdId === props.id;
    useEffect(() => {
        if (indexMismatch) {
            setThreesholdId(undefined as any);
        }
    }, [indexMismatch, setThreesholdId, props.id]);

    const isDraggingSrouce =
        isDragging &&
        draggedItem?.index === props.index &&
        draggedItem?.droppableId === props.droppableId;

    useEffect(() => {
        if (isDraggingSrouce) {
            setThreesholdIndex(props.index);
            setThreesholdId(props.id);
        }
    }, [isDraggingSrouce, setThreesholdIndex, setThreesholdId, props.index, props.id]);

    const dndRef = useCallback(
        (element: any) => {
            ref.current = drag(drop(element));
        },
        [drag, drop]
    );

    return children({ ref: dndRef, style }, { isDragging, isOver: isOver });
};

export { Draggable };
