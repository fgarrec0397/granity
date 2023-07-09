import { IdsArrayItem } from "@engine/App/Core/_actions/coreTypes";
import { HasChildren, RecursiveArrayOfIds, RecursiveArrayOfIdsItem } from "@granity/helpers";
import Delete from "@granity/icons/Delete";
import Star from "@granity/icons/Star";
import Visibility from "@granity/icons/Visibility";
import VisibilityOff from "@granity/icons/VisibilityOff";
import { IconButton, ListItem, ListItemButton, pxToRem, SxProps } from "@granity/ui";
import { forwardRef, ReactElement } from "react";

export const ItemTypes = {
    LIST_ITEM: "DRAGGABLE_LIST_ITEM",
};

export type EditorItemsListItemProps = HasChildren & {
    index: number;
    item: RecursiveArrayOfIdsItem<string>;
    itemName?: string;
    isDraggable?: boolean;
    isOverWhileDragging?: boolean;
    style?: SxProps;
    isDragging: boolean;
    itemsDictionaryIds: RecursiveArrayOfIds<string>;
    editModal?: (id: string) => ReactElement;
    isDefault?: (id: string) => boolean | undefined;
    handleClickRow?: (id: string) => void;
    isActionRowSelected?: (id: string) => boolean;
    isVisible?: (id: IdsArrayItem) => boolean | undefined;
    handleVisibility?: (id: IdsArrayItem) => void;
    handleClickRemove?: (id: IdsArrayItem) => void;
};

const EditorItemsListItem = forwardRef<HTMLLIElement, EditorItemsListItemProps>(
    (
        {
            item,
            itemName,
            isDragging,
            style,
            editModal,
            handleVisibility,
            isVisible,
            handleClickRemove,
            isDefault,
            handleClickRow,
            isActionRowSelected,
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
                    backgroundColor: theme.palette.background.default,
                    ".MuiListItemSecondaryAction-root": {
                        top: pxToRem(18),
                    },
                    ...(style as any),
                })}
                secondaryAction={
                    <>
                        {editModal?.(item.id)}
                        {handleVisibility && (
                            <IconButton onClick={() => handleVisibility?.(item)}>
                                {isVisible?.(item) ? (
                                    <Visibility fontSize="small" />
                                ) : (
                                    <VisibilityOff fontSize="small" />
                                )}
                            </IconButton>
                        )}
                        <IconButton onClick={() => handleClickRemove?.(item)}>
                            <Delete fontSize="small" />
                        </IconButton>
                    </>
                }
                disablePadding
            >
                <ListItemButton
                    onClick={() => handleClickRow?.(item.id)}
                    selected={isActionRowSelected?.(item.id)}
                >
                    {itemName}
                    {isDefault?.(item.id) && (
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
