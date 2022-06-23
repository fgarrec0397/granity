/**
 * Additional props that applies for widgets in the editor
 */
export interface EditableWidget {
    hovered: boolean;
}

export enum ModesAvailable {
    Translate = "translate",
    Rotate = "rotate",
    Scale = "scale",
}
