import { RecursiveArrayOfIds } from "@granity/helpers";
import { SxProps } from "@granity/ui";

export type DragItem = {
    parentId: string;
    id: string;
    index: number;
    path?: string;
    title?: string;
    type: string;
    children?: RecursiveArrayOfIds<string>;
};

export type DragAndDropSnapshot = {
    isDragging: boolean;
    isOver: boolean;
};

export type DragCollectProps = {
    isDragging: boolean;
    draggedItem: DragItem;
};

export type DropCollectProps = {
    isOver: boolean;
    style: SxProps | undefined;
    isDropTarget: boolean;
};

// Provider

export type DropResultItem = {
    index?: number;
    path?: string;
    id: string;
    parentId?: string;
};

export type DropResult = {
    source: DropResultItem;
    destination?: DropResultItem;
    dropType: "move" | "combine";
    sameSource: boolean;
};

export type OnDrop = (dropResult: DropResult) => void;

export type OnMoveItemResult = Omit<DragItem, "type" | "title">;

export type OnMove = (sourceItem: OnMoveItemResult, destinationItem: OnMoveItemResult) => void;
