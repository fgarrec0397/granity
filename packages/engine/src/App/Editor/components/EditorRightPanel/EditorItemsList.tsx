import { EditorListDragItem, useScenes, useWidgets } from "@engine/api";
import { clone, cloneDeep, RecursiveArrayOfIds } from "@granity/helpers";
import { Box, List, pxToRem, Typography } from "@granity/ui";
import { FC, ReactElement, useCallback, useEffect, useState } from "react";

import {
    getChild,
    getParentIds,
    handleMoveToDifferentParent,
    handleMoveWithinParent,
    handleRemoveItemFromList,
    splitPath,
} from "../../_actions/utilities/dnd";
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
    onNesting?: (hoveredItemId: string, draggingItemId: string) => void;
    moveItem?: (itemDrag: EditorListDragItem, itemDrop: EditorListDragItem) => void;
    dropItem?: (
        isNesting: boolean,
        itemDrag: EditorListDragItem,
        itemDrop: EditorListDragItem
    ) => void;
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
    onNesting,
    moveItem,
    dropItem,
}: EditorItemsListProps) => {
    const { displayWidgetName } = useWidgets();
    const { displaySceneName } = useScenes();

    return (
        <List>
            {itemsDictionaryIds.length > 0 ? (
                itemsDictionaryIds.map((item, index) => {
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
                                itemsDictionaryIds={itemsDictionaryIds}
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
                                onNesting={onNesting}
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
                                            onNesting={onNesting}
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

type EditorItemsListContainerProps = Omit<EditorItemsListProps, "moveItem" | "dropItem">;

export const EditorItemsListContainer: FC<EditorItemsListContainerProps> = ({
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
    onNesting,
}) => {
    const [items, setItems] = useState(itemsDictionaryIds);
    const [testItems, setTestItems] = useState([
        {
            id: "id1",
            path: "0",
            children: [
                {
                    id: "nestedId1",
                    path: "0/0",
                    children: [{ id: "nestedNestedId1", path: "0/0/0" }],
                },
                {
                    id: "nestedId2",
                    path: "0/1",
                },
            ],
        },
        {
            id: "id2",
            path: "1",
        },
        {
            id: "id3",
            path: "2",
        },
    ]);

    useEffect(() => {
        const clonedTestItems = cloneDeep(testItems);
        const movedToDifferentParent = handleMoveToDifferentParent(clonedTestItems, [1], [2, 0]);
        // console.log(movedToDifferentParent, "movedToDifferentParent");
        const parentIds = getParentIds(clonedTestItems, [0, 0, 0]);
        // console.log(parentIds, "parentIds");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setItems(itemsDictionaryIds);
    }, [itemsDictionaryIds]);

    const moveItem = useCallback(
        (itemDrag: EditorListDragItem, itemDrop: EditorListDragItem) => {
            const clonedItems = clone(items);

            const splitItemPath = splitPath(itemDrag);
            const splitDropZonePath = splitPath(itemDrop);

            let updatedItems = clonedItems;

            if (splitItemPath.length === splitDropZonePath.length) {
                updatedItems = handleMoveWithinParent(
                    clonedItems,
                    splitItemPath,
                    splitDropZonePath
                );
            } else {
                updatedItems = handleMoveToDifferentParent(
                    clonedItems,
                    splitItemPath,
                    splitDropZonePath
                );
            }

            setItems(updatedItems);
        },
        [items]
    );

    const dropItem = useCallback(
        (isNesting: boolean, itemDrag: EditorListDragItem, itemDrop: EditorListDragItem) => {
            const splitItemPath = splitPath(itemDrag);
            const splitDropZonePath = [...splitPath(itemDrop), 0];

            let updatedItems = { ...items };

            console.log({ splitItemPath, splitDropZonePath });

            if (isNesting) {
                updatedItems = handleMoveToDifferentParent(items, splitItemPath, splitDropZonePath);
            }
            onDropItem?.(updatedItems);
        },
        [items, onDropItem]
    );

    return (
        <EditorItemsList
            itemsDictionaryIds={items}
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
            dropItem={dropItem}
            moveItem={moveItem}
            onNesting={onNesting}
        />
    );
};

export default EditorItemsList;
