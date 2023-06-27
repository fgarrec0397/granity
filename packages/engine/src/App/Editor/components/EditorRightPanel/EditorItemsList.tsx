import { EditorListDragItem, useScenes, useWidgets } from "@engine/api";
import { DndContextProvider, Draggable, Droppable, OnDrop, OnMove } from "@granity/draggable";
import { clone, RecursiveArrayOfIds } from "@granity/helpers";
import { Box, List, pxToRem, Typography } from "@granity/ui";
import { FC, ReactElement, useCallback, useEffect, useState } from "react";

import { DraggableTypes } from "../../_actions/editorConstants";
import {
    handleMoveToDifferentParent,
    handleMoveWithinParent,
    handleNestItem,
    splitPath,
} from "../../_actions/utilities/dnd";
import EditorCustomDragLayer from "../EditorCommon/EditorCustomDragLayer";
import EditorItemsListItem from "./EditorItemsListItem";

export type EditorItemsListButtonProps = {
    text: string;
    callback?: () => void;
};

export type EditorItemsListProps = {
    parentId: string;
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
    parentId,
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
                        <Draggable<HTMLLIElement>
                            key={item.id}
                            parentId={parentId}
                            id={item.id}
                            index={index}
                            path={item.path}
                            title={parentItemName || ""}
                            type={DraggableTypes.ListItem}
                        >
                            {(provided, snapshot) => {
                                return (
                                    <EditorItemsListItem
                                        {...provided}
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
                                        isDragging={snapshot.isDragging}
                                    >
                                        <Droppable
                                            id={item.id}
                                            parentId={parentId}
                                            index={index}
                                            path={item.path}
                                            accept={[DraggableTypes.ListItem]}
                                        >
                                            {(providedStyle, _, placeholder) => {
                                                return (
                                                    <Box
                                                        {...providedStyle}
                                                        sx={{
                                                            padding: pxToRem(0, 0, 0, 10),
                                                        }}
                                                    >
                                                        {placeholder}

                                                        {item.children?.length ? (
                                                            <EditorItemsList
                                                                itemsDictionaryIds={item.children!}
                                                                parentId={item.id}
                                                                noItemsText={noItemsText}
                                                                editModal={editModal}
                                                                isVisible={isVisible}
                                                                isDefault={isDefault}
                                                                handleVisibility={handleVisibility}
                                                                displayItemName={displayItemName}
                                                                handleClickRow={handleClickRow}
                                                                handleClickRemove={
                                                                    handleClickRemove
                                                                }
                                                                isActionRowSelected={
                                                                    isActionRowSelected
                                                                }
                                                                isItemNesting={isItemNesting}
                                                                onIsNestingChange={
                                                                    onIsNestingChange
                                                                }
                                                                onDropItem={onDropItem}
                                                                onNesting={onNesting}
                                                            />
                                                        ) : null}
                                                    </Box>
                                                );
                                            }}
                                        </Droppable>
                                    </EditorItemsListItem>
                                );
                            }}
                        </Draggable>
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

    useEffect(() => {
        setItems(itemsDictionaryIds);
    }, [itemsDictionaryIds]);

    const moveItem: OnMove = useCallback(
        (sourceItem, destinationItem) => {
            // const clonedItems = clone(items);
            // const splitItemPath = splitPath(sourceItem.path);
            // const splitDropZonePath = splitPath(destinationItem.path);
            // let updatedItems = clonedItems;
            // if (splitItemPath.length === splitDropZonePath.length) {
            //     updatedItems = handleMoveWithinParent(
            //         clonedItems,
            //         splitItemPath,
            //         splitDropZonePath
            //     );
            // } else {
            //     updatedItems = handleMoveToDifferentParent(
            //         clonedItems,
            //         splitItemPath,
            //         splitDropZonePath
            //     );
            // }
            // setItems(updatedItems);
        },
        [items]
    );

    const dropItem = useCallback(
        (isNesting: boolean, itemDrag: EditorListDragItem, itemDrop: EditorListDragItem) => {
            const splitItemPath = splitPath(itemDrag.path);
            const splitDropZonePath = [...splitPath(itemDrop.path), 0];

            let updatedItems = { ...items };

            if (isNesting) {
                updatedItems = handleMoveToDifferentParent(items, splitItemPath, splitDropZonePath);
            }
            onDropItem?.(updatedItems);
        },
        [items, onDropItem]
    );

    const onDrop: OnDrop = ({ source, destination, dropType, sameSource }) => {
        if (source.id === destination.id) {
            return;
        }

        const { index: srcIndex, parentId: srcContainerId, path: srcPath } = source;
        const { index: destIndex, parentId: destContainerId, path: destPath } = destination;

        console.log({ source, destination, dropType, sameSource });

        const clonedItems = clone(items);

        const splitSrcPath = splitPath(srcPath);
        const splitDestPath = splitPath(destPath);

        let updatedItems = clonedItems;

        if (dropType === "replace") {
            if (srcContainerId === destContainerId) {
                console.log("handleMoveWithinParent");

                updatedItems = handleMoveWithinParent(clonedItems, splitSrcPath, splitDestPath);
            } else {
                console.log("handleMoveToDifferentParent");
                updatedItems = handleMoveToDifferentParent(
                    clonedItems,
                    splitSrcPath,
                    splitDestPath
                );
            }
        }

        if (dropType === "combine") {
            console.log({ splitSrcPath, splitDestPath }, "handleNestItem");

            updatedItems = handleNestItem(clonedItems, splitSrcPath, splitDestPath);
        }

        onDropItem?.(updatedItems);
    };

    return (
        <DndContextProvider onDrop={onDrop} onMove={moveItem}>
            <EditorCustomDragLayer />
            <Droppable id="container" accept={[DraggableTypes.ListItem]} path="root">
                {(providedStyle, snapshot, placeholder) => {
                    return (
                        <>
                            <EditorItemsList
                                {...providedStyle}
                                parentId="container"
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
                            {/* {placeholder} */}
                        </>
                    );
                }}
            </Droppable>
        </DndContextProvider>
    );
};

export default EditorItemsList;
