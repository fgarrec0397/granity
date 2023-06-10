import { clone, RecursiveIdsArray } from "@granity/helpers";
import { Box, List, pxToRem, Typography } from "@granity/ui";
import { ReactElement, useCallback } from "react";

import EditorItemsListItem from "./EditorItemsListItem";

export type EditorItemsListButtonProps = {
    text: string;
    callback?: () => void;
};

export type EditorItemsListProps = {
    itemsDictionaryIds: RecursiveIdsArray<string>;
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
    changeItemsHandler?: (ids: RecursiveIdsArray<string>) => void;
    hasDropWhenNesting?: (hoveredItemId: string, draggingItemId: string) => void;
    recursivelyCalled?: boolean;
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
    recursivelyCalled,
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
                itemsDictionaryIds.map((id, index) => {
                    if (typeof id !== "string") {
                        const parentItemName = displayItemName ? displayItemName(id[0]) : undefined;

                        return (
                            <>
                                <EditorItemsListItem
                                    key={id[0]}
                                    id={id[0]}
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
                                <Box
                                    sx={{
                                        padding: pxToRem(0, 0, 0, 10),
                                    }}
                                >
                                    <EditorItemsList
                                        itemsDictionaryIds={id[1]}
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
                                        recursivelyCalled
                                    />
                                </Box>
                            </>
                        );
                    } else {
                        const itemName = displayItemName ? displayItemName(id) : undefined;

                        if (recursivelyCalled) {
                            console.log({ id, itemName });
                        }

                        return (
                            <EditorItemsListItem
                                key={id}
                                id={id}
                                index={index}
                                itemName={itemName}
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
                        );
                    }
                })
            ) : (
                <Typography>{noItemsText}</Typography>
            )}
        </List>
    );
};

export default EditorItemsList;
