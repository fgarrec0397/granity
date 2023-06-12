import { clone, RecursiveArrayOfIds } from "@granity/helpers";
import { Box, List, pxToRem, Typography } from "@granity/ui";
import { ReactElement, useCallback } from "react";

import EditorItemsListItem from "./EditorItemsListItem";

export type EditorItemsListButtonProps = {
    text: string;
    callback?: () => void;
};

export type EditorItemsListProps = {
    itemsDictionaryIds: RecursiveArrayOfIds<string>;
    noItemsText: string;
    editModal?: (id: string) => ReactElement;
    isVisible?: (id: string) => boolean | undefined;
    isDefault?: (id: string) => boolean | undefined;
    handleVisibility?: (id: string) => void;
    displayItemName?: (id: string) => string | undefined;
    handleClickRow?: (id: string) => void;
    handleClickRemove?: (id: string) => void;
    isActionRowSelected?: (id: string) => boolean;
    isItemNesting?: (id: string) => boolean;
    onIsNestingChange?: (id: string, isNesting: boolean) => void;
    changeItemsHandler?: (ids: RecursiveArrayOfIds<string>) => void;
    hasDropWhenNesting?: (hoveredItemId: string, draggingItemId: string) => void;
};

export interface DragAndDropItem {
    id: number;
    text: string;
}

export interface DragAndDropItemCards {
    cards: DragAndDropItem[];
}

const EditorItemsList = ({
    itemsDictionaryIds,
    noItemsText,
    editModal,
    isVisible,
    isDefault,
    handleVisibility,
    displayItemName,
    handleClickRow,
    handleClickRemove,
    isActionRowSelected,
    isItemNesting,
    onIsNestingChange,
    changeItemsHandler,
    hasDropWhenNesting,
}: EditorItemsListProps) => {
    const moveItem = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const clonedPrevData = clone(itemsDictionaryIds);
            const removedItem = clonedPrevData.splice(dragIndex, 1);
            clonedPrevData.splice(hoverIndex, 0, ...removedItem);

            changeItemsHandler?.(clonedPrevData);
        },
        [changeItemsHandler, itemsDictionaryIds]
    );

    return (
        <List>
            {itemsDictionaryIds.length > 0 ? (
                itemsDictionaryIds.map((item, index) => {
                    const parentItemName = displayItemName ? displayItemName(item.id) : undefined;

                    return (
                        <>
                            <EditorItemsListItem
                                key={item.id}
                                id={item.id}
                                index={index}
                                itemName={parentItemName}
                                editModal={editModal}
                                isVisible={isVisible}
                                isDefault={isDefault}
                                handleVisibility={handleVisibility}
                                handleClickRow={handleClickRow}
                                handleClickRemove={handleClickRemove}
                                isActionRowSelected={isActionRowSelected}
                                isItemNesting={isItemNesting}
                                onIsNestingChange={onIsNestingChange}
                                hasDropWhenNesting={hasDropWhenNesting}
                                moveItem={moveItem}
                            />
                            {item.children?.length ? (
                                <Box
                                    sx={{
                                        padding: pxToRem(0, 0, 0, 10),
                                    }}
                                >
                                    <EditorItemsList
                                        itemsDictionaryIds={item.children}
                                        noItemsText={noItemsText}
                                        editModal={editModal}
                                        isVisible={isVisible}
                                        isDefault={isDefault}
                                        handleVisibility={handleVisibility}
                                        displayItemName={displayItemName}
                                        handleClickRow={handleClickRow}
                                        handleClickRemove={handleClickRemove}
                                        isActionRowSelected={isActionRowSelected}
                                        isItemNesting={isItemNesting}
                                        onIsNestingChange={onIsNestingChange}
                                        changeItemsHandler={changeItemsHandler}
                                        hasDropWhenNesting={hasDropWhenNesting}
                                    />
                                </Box>
                            ) : null}
                        </>
                    );
                })
            ) : (
                <Typography>{noItemsText}</Typography>
            )}
        </List>
    );
};

export default EditorItemsList;
