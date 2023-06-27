import { CSSProperties, RefObject, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { useDndContext, useDroppableContext } from "../Provider/DndContextProvider";
import { DragCollectProps, DraggableSnapshot, DragItem, DragItemRaw, DropResult } from "../types";
import { getElementMargin, getTranslationStyle, handleHover } from "./utils";

export type DraggableChildrenProp<RefType extends HTMLElement> = {
    ref: RefObject<RefType>;
    style: CSSProperties;
};

export type DraggableProps<RefType extends HTMLElement> = DragItemRaw & {
    children: (props: DraggableChildrenProp<RefType>, snapshot: DraggableSnapshot) => JSX.Element;
};

const Draggable = <RefType extends HTMLElement>({
    children,
    ...props
}: DraggableProps<RefType>) => {
    const ref = useRef<RefType>(null);
    const { onDrop } = useDndContext();

    const {
        threesholdIndex,
        threesholdId,
        setThreesholdIndex,
        setThreesholdId,
        getAcceptTypes,
        isDropTarget: isParentActive,
    } = useDroppableContext(props.parentId);

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
                    parentId: item.parentId,
                    path: item.path,
                    title: item.title,
                },
                destination: {
                    index: props.index,
                    id: props.id,
                    parentId: props.parentId,
                    path: props.path,
                    title: props.title,
                },
                dropType: "combine",
                sameSource: draggedItem.parentId === props.parentId,
            };
        },

        hover(item, monitor) {
            const sourceItem = item;
            const destinationItem = props;

            console.log({ sourceItem, destinationItem });

            // moveItem()
            // handleHover(monitor, {
            //     sourceItem: item,
            //     destinationItem: props,
            //     ref,
            //     setThreesholdIndex,
            //     threesholdIndex,
            // });
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
        draggedItem?.parentId === props.parentId;

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
