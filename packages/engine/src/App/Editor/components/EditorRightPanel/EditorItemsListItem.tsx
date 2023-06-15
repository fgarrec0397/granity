import { RecursiveArrayOfIds } from "@granity/helpers";
import Delete from "@granity/icons/Delete";
import Star from "@granity/icons/Star";
import Visibility from "@granity/icons/Visibility";
import VisibilityOff from "@granity/icons/VisibilityOff";
import { IconButton, ListItem, ListItemButton, pxToRem } from "@granity/ui";
import { CSSProperties, ReactElement, useEffect } from "react";

import useDraggableListItem from "../EditorCommon/hooks/useDraggableListItem";

export const ItemTypes = {
    LIST_ITEM: "LIST_ITEM",
};

export type EditorItemsListItemProps = {
    id: string;
    index: number;
    itemPath: string;
    itemName?: string;
    isDraggable?: boolean;
    additionalStyles?: CSSProperties;
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
    hasDropWhenNesting?: (hoveredItemId: string, draggingItemId: string) => void;
    moveItem?: (dragIndex: number, hoverIndex: number) => void;
    dropItem?: () => void;
};

const EditorItemsListItem = ({
    id,
    index,
    itemPath,
    itemsDictionaryIds,
    itemName,
    isDraggable,
    additionalStyles,
    editModal,
    handleVisibility,
    isVisible,
    handleClickRemove,
    isDefault,
    handleClickRow,
    isActionRowSelected,
    isItemNesting,
    onIsNestingChange,
    hasDropWhenNesting,
    moveItem,
    dropItem,
}: EditorItemsListItemProps) => {
    useEffect(() => {
        console.log(itemsDictionaryIds, "itemsDictionaryIds");
    }, [itemsDictionaryIds]);
    const draggableList = useDraggableListItem({
        dragItem: {
            id,
            index,
            title: itemName,
            path: itemPath,
            type: ItemTypes.LIST_ITEM,
        },
        itemsDictionaryIds,
        moveItem,
        dropItem,
        isDraggable,
    });

    useEffect(() => {
        if (draggableList) {
            onIsNestingChange?.(id, draggableList.isNesting || false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [draggableList?.isNesting]);

    useEffect(() => {
        if (draggableList?.itemHoveredId && draggableList.draggingItemId) {
            hasDropWhenNesting?.(draggableList.itemHoveredId, draggableList.draggingItemId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [draggableList?.isNesting]);

    useEffect(() => {
        if (isItemNesting?.(id)) {
        }
    }, [id, isItemNesting]);

    return (
        <ListItem
            ref={draggableList?.ref}
            data-handler-id={draggableList?.handlerId}
            sx={(theme) => ({
                opacity: draggableList?.isDragging ? 0 : 1,
                maxWidth: pxToRem(250),
                backgroundColor: theme.palette.background.default,
                border: isItemNesting?.(id) ? "1px solid red" : "1px solid transparent",
                ...additionalStyles,
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
        </ListItem>
    );
};

export default EditorItemsListItem;
