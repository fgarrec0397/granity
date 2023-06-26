import { FC, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { useDroppableContext, useOnDrop } from "../Provider/DndContextProvider";
import { DragCollectProps, DraggableProps, DragItem, DropResult } from "../types";
import { getElementMargin, getTranslationStyle, handleHover } from "./utils";

const Draggable: FC<DraggableProps> = ({ children, ...props }) => {
    const ref = useRef<HTMLDivElement>(null);
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
            const element = ref.current;
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

            const { style: translationStyle } = getTranslationStyle({
                sourceItem: sourceItem,
                destinationItem: props,
                threesholdIndex,
                domRect: sourceItem?.__rect__,
                isDragging: sourceIsDragging,
                isParentActive,
                margin: sourceItem?.margin,
            });

            return {
                isDragging: sourceIsDragging,
                draggedItem: sourceItem,
                style: translationStyle,
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
                    droppableId: item.droppableId,
                    path: item.path,
                },
                destination: {
                    index: props.index,
                    id: props.id,
                    droppableId: props.droppableId,
                    path: props.path,
                },
                dropType: "combine",
                sameSource: draggedItem.droppableId === props.droppableId,
            };
        },

        hover(item, monitor) {
            handleHover(monitor, {
                sourceItem: item,
                destinationItem: props,
                ref,
                setThreesholdIndex,
                threesholdIndex,
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

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    drag(drop(ref.current));

    return children({ ref, style }, { isDragging, isOver: isOver });
};

export { Draggable };
