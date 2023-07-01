import { SxProps } from "@granity/ui";
import { RefObject } from "react";
import { DropTargetMonitor, XYCoord } from "react-dnd";

import { DragSourceMonitor } from "../..";
import { DragItem, DragItemRaw, DropResult, MarginType } from "../types";

export const getElementMargin = <Element extends HTMLElement>(element: Element | null) => {
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

type HandleHoverParams<RefType extends HTMLElement> = {
    sourceItem: DragItemRaw;
    destinationItem: DragItemRaw;
    ref: RefObject<RefType>;
    threesholdIndex: number;
    setThreesholdIndex: (index: number) => void;
    horizontal?: boolean;
    setDraggingStatus: (status: "canMoveNext" | "canMovePrev" | "canCombine") => void;
    setDropType: (dropType: "move" | "combine") => void;
    dropType: "move" | "combine";
};

const getElementHeight = <RefType extends HTMLElement>(ref: RefObject<RefType>) => {
    const hoverBoundingRect = ref.current?.getBoundingClientRect();

    if (!hoverBoundingRect?.bottom && !hoverBoundingRect?.top) {
        return;
    }

    return hoverBoundingRect?.bottom - hoverBoundingRect?.top;
};

export const handleHover = <RefType extends HTMLElement>(
    monitor: DropTargetMonitor<DragItem, DropResult>,
    {
        sourceItem,
        destinationItem,
        ref,
        threesholdIndex,
        setThreesholdIndex,
        horizontal,
        setDropType,
        setDraggingStatus,
    }: HandleHoverParams<RefType>
) => {
    const isDropTarget = monitor.isOver({ shallow: true });

    if (!isDropTarget) return;

    if (!ref.current) {
        return;
    }

    const isSameSource = sourceItem.parentId === destinationItem.parentId;
    const dragIndex = sourceItem.index;
    const hoverIndex = destinationItem.index;

    const xyCoordinate = horizontal ? "x" : "y";
    const marginKeys = horizontal
        ? ({ first: "left", last: "right" } as const)
        : ({ first: "top", last: "bottom" } as const);

    if (isSameSource) {
        // Don't replace items with themselves
        if (dragIndex === hoverIndex && sourceItem.parentId === destinationItem.parentId) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();

        // Get vertical height
        const hoverItemHeight = getElementHeight(ref);

        if (!hoverItemHeight) {
            return;
        }

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY =
            (clientOffset as XYCoord)[xyCoordinate] - hoverBoundingRect[marginKeys.first];

        // Dragging downwards
        if (dragIndex < hoverIndex) {
            if (hoverClientY < 5) {
                setDraggingStatus("canMovePrev");
                setThreesholdIndex(hoverIndex - 1);
                setDropType("move");

                return;
            }

            if (hoverClientY > hoverItemHeight - 5) {
                setDraggingStatus("canMoveNext");
                setThreesholdIndex(hoverIndex);
                setDropType("move");

                return;
            }

            setThreesholdIndex(hoverIndex);
            setDropType("combine");

            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex) {
            if (hoverClientY > hoverItemHeight - 5) {
                setDraggingStatus("canMoveNext");
                setThreesholdIndex(hoverIndex + 1);
                setDropType("move");

                return;
            }

            if (hoverClientY < 5) {
                setDraggingStatus("canMovePrev");
                setThreesholdIndex(hoverIndex);
                setDropType("move");

                return;
            }

            setThreesholdIndex(hoverIndex);
            setDropType("combine");

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

export const handleStyle = <RefType extends HTMLElement>(
    monitor: DragSourceMonitor<DragItem, DropResult>,
    {
        sourceItem,
        destinationItem,
        threesholdIndex,
        dropType,
        ref,
        draggingStatus,
    }: {
        sourceItem: DragItemRaw;
        destinationItem: DragItemRaw;
        isDragging: boolean;
        horizontal?: boolean;
        threesholdIndex: number;
        isParentActive: boolean;
        domRect?: DOMRect;
        margin?: MarginType;
        isOver: boolean;
        dropType: "combine" | "move";
        ref: RefObject<RefType>;
        draggingStatus: "canMoveNext" | "canMovePrev" | "canCombine";
    }
) => {
    if (!ref.current) {
        return;
    }

    const backgroundColor: SxProps = {
        backgroundColor:
            dropType === "combine" && threesholdIndex === destinationItem.index
                ? "#ffffff50"
                : "transparent",
    };

    const displayTopBar =
        draggingStatus === "canMovePrev" && destinationItem.index === threesholdIndex + 1;
    const displayBottomBar =
        draggingStatus === "canMoveNext" && destinationItem.index === threesholdIndex;

    const displaymBar = (dropType === "move" && displayTopBar) || displayBottomBar;

    const border: SxProps = {
        "&::after": {
            content: '""',
            position: "absolute",
            ...(draggingStatus === "canMoveNext" && { bottom: 0 }),
            ...(displayTopBar && { top: 0 }),
            display: displaymBar ? "block" : "none",
            height: "3px",
            width: "100%",
            backgroundColor: "#ffffff50",
        },
    };
    const style: SxProps = {
        ...border,
        ...backgroundColor,
    };

    return { style };
};
