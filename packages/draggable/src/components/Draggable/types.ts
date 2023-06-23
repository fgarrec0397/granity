import { CSSProperties } from "react";

export interface DragItem {
    id: string;
    index: number;
    type: string;
    droppableId: string;
}

export interface DraggedData {
    __rect__: DOMRect;
    margin: {
        top: number;
        bottom: number;
    };
    index: number;
    type: string;
    droppableId: string;
}

export interface DraggableChildrenProp {
    ref: (element: any) => any;
    style: React.CSSProperties;
    // "data-handler-id": any;
    // preview: ConnectDragPreview;
}

export interface DraggableSnapshot {
    isDragging: boolean;
    isOver: boolean;
}

export interface DraggableProps extends DragItem {
    horizontal?: boolean;
    children: (props: DraggableChildrenProp, snapshot: DraggableSnapshot) => JSX.Element;
}

export type DragCollectProps = {
    isDragging: boolean;
    draggedItem: DragItem;
    style: CSSProperties;
};
