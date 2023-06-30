import { HasChildren, RecursiveArrayOfIds } from "@granity/helpers";
import Delete from "@granity/icons/Delete";
import Star from "@granity/icons/Star";
import Visibility from "@granity/icons/Visibility";
import VisibilityOff from "@granity/icons/VisibilityOff";
import { IconButton, ListItem, ListItemButton, pxToRem } from "@granity/ui";
import { CSSProperties, forwardRef, ReactElement } from "react";

import { EditorListDragItem } from "../../_actions/editorTypes";

export const ItemTypes = {
    LIST_ITEM: "DRAGGABLE_LIST_ITEM",
};

export type EditorItemsListItemProps = HasChildren & {
    id: string;
    index: number;
    itemPath: string;
    itemName?: string;
    itemChildren?: RecursiveArrayOfIds<string>;
    isDraggable?: boolean;
    isOverWhileDragging?: boolean;
    style?: CSSProperties;
    isDragging: boolean;
    itemsDictionaryIds: RecursiveArrayOfIds<string>;
    editModal?: (id: string) => ReactElement;
    isVisible?: (id: string) => boolean | undefined;
    isDefault?: (id: string) => boolean | undefined;
    handleVisibility?: (id: string) => void;
    handleClickRow?: (id: string) => void;
    handleClickRemove?: (id: string) => void;
    isActionRowSelected?: (id: string) => boolean;
    isItemNesting?: (id: string) => boolean;
    onIsNestingChange?: (id: string, isNesting: boolean) => void;
    onNesting?: (hoveredItemId: string, draggingItemId: string) => void;
    moveItem?: (itemDrag: EditorListDragItem, itemDrop: EditorListDragItem) => void;
    dropItem?: (
        isNesting: boolean,
        itemDrag: EditorListDragItem,
        itemDrop: EditorListDragItem
    ) => void;
};

const EditorItemsListItem = forwardRef<HTMLLIElement, EditorItemsListItemProps>(
    (
        {
            id,
            itemName,
            style,
            isDragging,
            isOverWhileDragging,
            editModal,
            handleVisibility,
            isVisible,
            handleClickRemove,
            isDefault,
            handleClickRow,
            isActionRowSelected,
            isItemNesting,
            children,
        }: EditorItemsListItemProps,
        ref
    ) => {
        return (
            <ListItem
                ref={ref}
                sx={(theme) => ({
                    display: "block",
                    opacity: isDragging ? 0 : 1,
                    maxWidth: pxToRem(250),
                    backgroundColor: isOverWhileDragging
                        ? theme.palette.background.paperLight + "50"
                        : theme.palette.background.default,
                    border: isItemNesting?.(id) ? "1px solid red" : "1px solid transparent",
                    ".MuiListItemSecondaryAction-root": {
                        top: pxToRem(18),
                    },
                    ...style,
                })}
                secondaryAction={
                    <>
                        {editModal?.(id)}
                        {handleVisibility && (
                            <IconButton onClick={() => handleVisibility?.(id)}>
                                {isVisible?.(id) ? (
                                    <Visibility fontSize="small" />
                                ) : (
                                    <VisibilityOff fontSize="small" />
                                )}
                            </IconButton>
                        )}
                        <IconButton onClick={() => handleClickRemove?.(id)}>
                            <Delete fontSize="small" />
                        </IconButton>
                    </>
                }
                disablePadding
            >
                <ListItemButton
                    onClick={() => handleClickRow?.(id)}
                    selected={isActionRowSelected?.(id)}
                >
                    {itemName}
                    {isDefault?.(id) && (
                        <Star
                            sx={{
                                fontSize: 10,
                                marginLeft: pxToRem(5),
                            }}
                        />
                    )}
                </ListItemButton>
                <div>{children}</div>
            </ListItem>
        );
    }
);

EditorItemsListItem.displayName = "EditorItemsListItem";

export default EditorItemsListItem;
