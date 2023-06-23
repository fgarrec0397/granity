export interface DropResult {
    source: { index: number; id: string; droppableId: string };
    destination: { index: number; id: string; droppableId: string };
    dropType: "replace" | "combine";
    sameSource: boolean;
}

export type OnDrop = (dropResult: DropResult) => void;

export interface ProviderProps {
    onDrop: OnDrop;
    HTML5Backend: any;
    children?: any;
}
