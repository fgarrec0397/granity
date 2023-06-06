import Delete from "@granity/icons/Delete";
import Star from "@granity/icons/Star";
import Visibility from "@granity/icons/Visibility";
import VisibilityOff from "@granity/icons/VisibilityOff";
import { IconButton, ListItem, ListItemButton, pxToRem } from "@granity/ui";
import { CSSProperties, ReactElement } from "react";

import useDraggableListItem from "../EditorCommon/hooks/useDraggableListItem";

export const ItemTypes = {
    LIST_ITEM: "LIST_ITEM",
};

export type EditorItemsListItemProps = {
    id: string;
    index: number;
    itemName?: string;
    isDraggable?: boolean;
    additionalStyles?: CSSProperties;
    editModal?: (id: string) => ReactElement;
    isVisible?: (id: string) => boolean | undefined;
    isDefault?: (id: string) => boolean | undefined;
    handleVisibility?: (id: string) => void;
    handleClickRow?: (id: string) => void;
    handleClickRemove?: (id: string) => void;
    isActionRowSelected?: (id: string) => boolean;
    moveItem?: (dragIndex: number, hoverIndex: number) => void;
};

const EditorItemsListItem = ({
    id,
    index,
    itemName,
    isDraggable = true,
    additionalStyles,
    editModal,
    handleVisibility,
    isVisible,
    handleClickRemove,
    isDefault,
    handleClickRow,
    isActionRowSelected,
    moveItem,
}: EditorItemsListItemProps) => {
    const draggableList = useDraggableListItem({
        dragItem: {
            id,
            index,
            title: itemName,
            type: ItemTypes.LIST_ITEM,
        },
        moveItem,
        isDraggable,
    });

    return (
        <ListItem
            key={id}
            ref={draggableList?.ref}
            data-handler-id={draggableList?.handlerId}
            sx={(theme) => ({
                opacity: draggableList?.isDragging ? 0 : 1,
                maxWidth: pxToRem(250),
                backgroundColor: theme.palette.background.default,
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
