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
    children: (
        props: DroppableChildrenProps,
        snapshot: DroppableSnapshot,
        placeholder: JSX.Element
    ) => JSX.Element;
}
