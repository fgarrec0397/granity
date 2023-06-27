import { RefObject } from "react";
import { DropTargetMonitor, XYCoord } from "react-dnd";

import { DragItem, DragItemRaw, DropResult, MarginType } from "../types";

export const getElementMargin = (element: HTMLDivElement | null) => {
    if (!element) {
        return {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        };
    }

    // const rect = element?.getBoundingClientRect();
    const computedStyle = getComputedStyle(element);
    const marginTop = computedStyle.getPropertyValue("margin-top").replace("px", "");
    const marginBottom = computedStyle.getPropertyValue("margin-bottom").replace("px", "");
    const marginLeft = computedStyle.getPropertyValue("margin-left").replace("px", "");
    const marginRight = computedStyle.getPropertyValue("margin-right").replace("px", "");

    return {
        left: parseInt(marginLeft),
        right: parseInt(marginRight),
        top: parseInt(marginTop),
        bottom: parseInt(marginBottom),
    };
};

type HandleHoverParams = {
    sourceItem: DragItemRaw;
    destinationItem: DragItemRaw;
    ref: RefObject<HTMLDivElement>;
    threesholdIndex: number;
    setThreesholdIndex: (index: number) => void;
    horizontal?: boolean;
};

export const handleHover = (
    monitor: DropTargetMonitor<DragItem, DropResult>,
    {
        sourceItem,
        destinationItem,
        ref,
        threesholdIndex,
        setThreesholdIndex,
        horizontal,
    }: HandleHoverParams
) => {
    const isDropTarget = monitor.isOver({ shallow: true });

    if (!isDropTarget) return;

    if (!ref.current) {
        return;
    }

    const isSameSource = sourceItem.droppableId === destinationItem.droppableId;
    const dragIndex = sourceItem.index;
    const hoverIndex = destinationItem.index;

    const xyCoordinate = horizontal ? "x" : "y";
    const marginKeys = horizontal
        ? ({ first: "left", last: "right" } as const)
        : ({ first: "top", last: "bottom" } as const);

    console.log(isSameSource, "isSameSource");

    if (isSameSource) {
        // Don't replace items with themselves
        if (dragIndex === hoverIndex && sourceItem.droppableId === destinationItem.droppableId) {
            return;
        }

        const isMovedUp =
            threesholdIndex !== -1 &&
            destinationItem.index > dragIndex &&
            threesholdIndex >= destinationItem.index;
        const isMovedDown =
            destinationItem.index < dragIndex &&
            threesholdIndex !== -1 &&
            threesholdIndex <= destinationItem.index;

        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY =
            (hoverBoundingRect[marginKeys.last] - hoverBoundingRect[marginKeys.first]) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY =
            (clientOffset as XYCoord)[xyCoordinate] - hoverBoundingRect[marginKeys.first];

        if (isMovedUp) {
            if (hoverClientY < hoverMiddleY) {
                setThreesholdIndex(hoverIndex - 1);
            }

            return;
        }
        if (isMovedDown) {
            if (hoverClientY > hoverMiddleY) {
                setThreesholdIndex(hoverIndex + 1);
            }
            return;
        }

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        setThreesholdIndex(hoverIndex);
    } else {
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY =
            (hoverBoundingRect[marginKeys.last] - hoverBoundingRect[marginKeys.first]) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY =
            (clientOffset as XYCoord)[xyCoordinate] - hoverBoundingRect[marginKeys.first];

        if (threesholdIndex <= hoverIndex) {
            if (hoverClientY > hoverMiddleY) {
                setThreesholdIndex(hoverIndex + 1);
            }
            return;
        } else {
            if (hoverClientY < hoverMiddleY) {
                setThreesholdIndex(hoverIndex);
            }
        }
    }
};

export const getTranslationStyle = ({
    sourceItem,
    destinationItem,
    isDragging,
    horizontal,
    threesholdIndex,
    isParentActive,
    domRect,
    margin,
}: {
    sourceItem: DragItemRaw;
    destinationItem: DragItemRaw;
    isDragging: boolean;
    horizontal?: boolean;
    threesholdIndex: number;
    isParentActive: boolean;
    domRect?: DOMRect;
    margin?: MarginType;
}) => {
    const droppableSourceId = sourceItem?.droppableId;
    const itemSourceIndex = sourceItem?.index;

    const sameSource = destinationItem.droppableId === droppableSourceId;
    let translateSign = 0;

    if (!isDragging && sourceItem && threesholdIndex !== -1) {
        if (sameSource) {
            const sourceIsAfter = itemSourceIndex > destinationItem.index;
            const sourceIsBefore = itemSourceIndex < destinationItem.index;
            translateSign =
                sourceIsAfter && threesholdIndex <= destinationItem.index
                    ? 1
                    : sourceIsBefore && threesholdIndex >= destinationItem.index
                    ? -1
                    : 0;
        } else if (isParentActive) {
            translateSign = threesholdIndex > destinationItem.index ? 0 : 1;
        }
    }

    const hasDraggedItem = !!sourceItem;

    const marginKeys = horizontal
        ? ({ first: "left", last: "right" } as const)
        : ({ first: "top", last: "bottom" } as const);

    const delta = Math.max(margin?.[marginKeys.first] || 0, margin?.[marginKeys.last] || 0);
    const xyCoordinate = horizontal ? "x" : "y";

    const rectSize = horizontal ? domRect?.width : domRect?.height;

    const transform =
        translateSign && domRect
            ? `translate${xyCoordinate.toUpperCase()}(${translateSign * (rectSize || 0 + delta)}px)`
            : undefined;

    const pointerEventsProps = isDragging ? { pointerEvents: "none" } : {};
    const transformProps = transform ? { transform } : {};
    const transitionProps = hasDraggedItem ? { transition: "0.3s" } : { transition: "0s" };

    const style = {
        ...transformProps,
        ...pointerEventsProps,
        ...transitionProps,
    } as unknown as React.CSSProperties;

    return { style };
};
