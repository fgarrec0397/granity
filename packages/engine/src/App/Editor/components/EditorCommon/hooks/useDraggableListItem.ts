import { getEmptyImage, Identifier, useDrag, useDrop, XYCoord } from "@granity/draggable";
import { useEffect, useRef } from "react";

import { ItemTypes } from "../../EditorRightPanel/EditorItemsListItem";

interface DragItem {
    index: number;
    id: string;
    title?: string;
    type: string;
}

export type DraggableListItem = {
    dragItem: DragItem;
    isDraggable?: boolean;
    moveItem?: (dragIndex: number, hoverIndex: number) => void;
};

export default ({ dragItem, moveItem, isDraggable }: DraggableListItem) => {
    const ref = useRef<HTMLLIElement>(null);

    if (!isDraggable) {
        return;
    }

    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: ItemTypes.LIST_ITEM,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: DragItem, monitor) {
            const dragIndex = item.index;
            const hoverIndex = dragItem.index;

            if (!ref.current) {
                return;
            }
            if (!moveItem) {
                return;
            }

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            moveItem(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag, preview] = useDrag({
        type: ItemTypes.LIST_ITEM,
        item: () => {
            return { id: dragItem.id, index: dragItem.index, title: dragItem.title };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    return {
        ref,
        handlerId,
        isDragging,
    };
};
