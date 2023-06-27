import { CSSProperties, RefObject } from "react";

// Draggable

export type DragItemRaw = {
    droppableId: string;
    id: string;
    index: number;
    path: string;
    title: string;
    type: string;
};

export type MarginType = { left: number; right: number; top: number; bottom: number };

export type DragItem = DragItemRaw & {
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    __rect__?: DOMRect;
};

export interface DraggableChildrenProp {
    ref: RefObject<HTMLDivElement>;
    style: React.CSSProperties;
}

export interface DraggableSnapshot {
    isDragging: boolean;
    isOver: boolean;
}

export interface DraggableProps extends DragItemRaw {
    children: (props: DraggableChildrenProp, snapshot: DraggableSnapshot) => JSX.Element;
}

export type DragCollectProps = {
    isDragging: boolean;
    draggedItem: DragItem;
    style: CSSProperties;
};

// Droppable

export interface DroppableChildrenProps {
    ref: (element: any) => void;
    style: React.CSSProperties;
    onMouseOver: (element: any) => void;
    // true if the droppable element is the real target
    "data-shallow-drop-target": boolean;
}

export interface DroppableSnapshot {
    isDropTarget: boolean;
}

export interface DroppableProps {
    id: string;
    accept: string[];
    horizontal?: boolean;
    path: string;
    title: string;
    children: (
        props: DroppableChildrenProps,
        snapshot: DroppableSnapshot,
        placeholder: JSX.Element
    ) => JSX.Element;
}

// Provider

export interface DropResultItem {
    index: number;
    // splitItemPath: number[];
    path: string;
    id: string;
    title: string;
    droppableId: string;
}

export interface DropResult {
    source: DropResultItem;
    destination: DropResultItem;
    dropType: "replace" | "combine";
    sameSource: boolean;
}

export type OnDrop = (dropResult: DropResult) => void;
