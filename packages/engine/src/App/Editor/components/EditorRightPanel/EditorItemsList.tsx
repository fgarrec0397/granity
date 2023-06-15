import { useScenes, useWidgets } from "@engine/api";
import { clone, RecursiveArrayOfIds } from "@granity/helpers";
import { Box, List, pxToRem, Typography } from "@granity/ui";
import { ReactElement, useCallback, useEffect, useState } from "react";

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
    onDropItem?: (newItems: RecursiveArrayOfIds<string>) => void;
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
    onDropItem,
    hasDropWhenNesting,
}: EditorItemsListProps) => {
    const [items, setItems] = useState(itemsDictionaryIds);

    const { displayWidgetName } = useWidgets();
    const { displaySceneName } = useScenes();

    useEffect(() => {
        setItems(itemsDictionaryIds);
    }, [itemsDictionaryIds]);

    const moveItem = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const clonedItems = clone(items);
            const removedItem = clonedItems.splice(dragIndex, 1);
            clonedItems.splice(hoverIndex, 0, ...removedItem);
            setItems(clonedItems);
        },
        [items]
    );

    const dropItem = useCallback(() => {
        onDropItem?.(items);
    }, [items, onDropItem]);

    return (
        <List>
            {items.length > 0 ? (
                items.map((item, index) => {
                    const parentItemName = displayItemName
                        ? displayItemName(item.id)
                        : displayWidgetName(item.id)
                        ? displayWidgetName(item.id)
                        : displaySceneName(item.id);

                    return (
                        <>
                            <EditorItemsListItem
                                key={item.id}
                                id={item.id}
                                itemPath={item.path}
                                itemChildren={item.children}
                                itemsDictionaryIds={items}
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
                                dropItem={dropItem}
                            >
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
                                            onDropItem={onDropItem}
                                            hasDropWhenNesting={hasDropWhenNesting}
                                        />
                                    </Box>
                                ) : null}
                            </EditorItemsListItem>
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
