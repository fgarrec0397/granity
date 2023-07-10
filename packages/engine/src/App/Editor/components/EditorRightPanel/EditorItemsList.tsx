import { IdsArrayItem } from "@engine/App/Core/_actions/coreTypes";
import useScenes from "@engine/App/Scenes/_actions/hooks/useScenes";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { DndContextProvider, DragAndDrop, OnDrop } from "@granity/draggable";
import { clone, RecursiveArrayOfIds } from "@granity/helpers";
import { Box, List, pxToRem, Typography } from "@granity/ui";
import { FC, ReactElement, useEffect, useState } from "react";

import { DraggableTypes } from "../../_actions/editorConstants";
import {
    handleMoveToDifferentParent,
    handleMoveWithinParent,
    handleUnNest,
    splitPath,
    updatePaths,
} from "../../_actions/utilities/dnd";
import EditorCustomDragLayer from "../EditorCommon/EditorCustomDragLayer";
import EditorItemsListItem from "./EditorItemsListItem";

export type EditorItemsListButtonProps = {
    text: string;
    callback?: () => void;
};

export type EditorItemsListProps = {
    parentId: string;
    itemsDictionaryIds?: RecursiveArrayOfIds<string>;
    noItemsText: string;
    isDragAndDropEnabled?: boolean;
    editModal?: (id: string) => ReactElement;
    isDefault?: (id: string) => boolean | undefined;
    displayItemName?: (id: string) => string | undefined;
    handleClickRow?: (id: string) => void;
    isActionRowSelected?: (id: string) => boolean;
    isVisible?: (id: IdsArrayItem) => boolean | undefined;
    handleVisibility?: (id: IdsArrayItem) => void;
    handleClickRemove?: (id: IdsArrayItem) => void;
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
    isDragAndDropEnabled = true,
    editModal,
    isVisible,
    isDefault,
    handleVisibility,
    displayItemName,
    handleClickRow,
    handleClickRemove,
    isActionRowSelected,
}: EditorItemsListProps) => {
    const { displayWidgetName } = useWidgets();
    const { displaySceneName } = useScenes();

    if (!itemsDictionaryIds) {
        return null;
    }

    return (
        <List>
            {itemsDictionaryIds.length > 0 ? (
                itemsDictionaryIds.map((item, index) => {
                    const parentItemName = displayItemName
                        ? displayItemName(item.id)
                        : displayWidgetName(item.id)
                        ? displayWidgetName(item.id)
                        : displaySceneName(item.id);

                    if (isDragAndDropEnabled) {
                        return (
                            <DragAndDrop<HTMLLIElement>
                                key={item.id}
                                dragItem={{
                                    id: item.id,
                                    parentId,
                                    index,
                                    path: item.path,
                                    title: parentItemName || "",
                                    type: DraggableTypes.ListItem,
                                    children: item.children,
                                }}
                                accept={[DraggableTypes.ListItem]}
                            >
                                {(provided, snapshot) => {
                                    return (
                                        <EditorItemsListItem
                                            {...provided}
                                            item={item}
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
                                            isDragging={snapshot.isDragging}
                                            isOverWhileDragging={snapshot.isOver}
                                        >
                                            {item.children?.length ? (
                                                <Box
                                                    sx={{
                                                        padding: pxToRem(0, 0, 0, 10),
                                                    }}
                                                >
                                                    <EditorItemsList
                                                        itemsDictionaryIds={item.children}
                                                        parentId={item.id}
                                                        noItemsText={noItemsText}
                                                        editModal={editModal}
                                                        isVisible={isVisible}
                                                        isDefault={isDefault}
                                                        handleVisibility={handleVisibility}
                                                        displayItemName={displayItemName}
                                                        handleClickRow={handleClickRow}
                                                        handleClickRemove={handleClickRemove}
                                                        isActionRowSelected={isActionRowSelected}
                                                    />
                                                </Box>
                                            ) : null}
                                        </EditorItemsListItem>
                                    );
                                }}
                            </DragAndDrop>
                        );
                    }

                    return (
                        <EditorItemsListItem
                            key={item.id}
                            item={item}
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
                            isDragging={false}
                        >
                            {item.children?.length ? (
                                <Box
                                    sx={{
                                        padding: pxToRem(0, 0, 0, 10),
                                    }}
                                >
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
                                        handleClickRemove={handleClickRemove}
                                        isActionRowSelected={isActionRowSelected}
                                        isDragAndDropEnabled={isDragAndDropEnabled}
                                    />
                                </Box>
                            ) : null}
                        </EditorItemsListItem>
                    );
                })
            ) : (
                <Typography>{noItemsText}</Typography>
            )}
        </List>
    );
};

type EditorItemsListContainerProps = Omit<
    EditorItemsListProps,
    "moveItem" | "dropItem" | "parentId"
> & {
    onDropItem?: (newItems: RecursiveArrayOfIds<string>) => void;
};

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
    onDropItem,
    isDragAndDropEnabled,
}) => {
    const [items, setItems] = useState(itemsDictionaryIds);

    useEffect(() => {
        if (!itemsDictionaryIds) {
            return;
        }

        setItems(updatePaths(itemsDictionaryIds));
    }, [itemsDictionaryIds]);

    if (!itemsDictionaryIds) {
        return null;
    }

    const onDrop: OnDrop = ({ source, destination, dropType, sameSource }) => {
        if (!destination) {
            return;
        }

        if (source.id === destination.id) {
            return;
        }

        const clonedItems = clone(items) || [];
        const splitSrcPath = splitPath(source.path);
        const splitDestPath = splitPath(destination?.path);

        let updatedItems = clonedItems;

        if (dropType === "move") {
            if (sameSource) {
                updatedItems = handleMoveWithinParent(clonedItems, splitSrcPath, splitDestPath);
            } else {
                if (splitSrcPath.length > splitDestPath.length) {
                    updatedItems = handleUnNest(clonedItems, splitSrcPath, splitDestPath);
                } else {
                    updatedItems = handleMoveToDifferentParent(
                        clonedItems,
                        splitSrcPath,
                        splitDestPath
                    );
                }
            }
        }

        if (dropType === "combine") {
            if (sameSource) {
                const newDestPath = [...splitDestPath, 0];

                updatedItems = handleMoveToDifferentParent(clonedItems, splitSrcPath, newDestPath);
            } else {
                if (splitSrcPath.length > splitDestPath.length) {
                    const newDestPath = [...splitDestPath, 0];

                    updatedItems = handleUnNest(clonedItems, splitSrcPath, newDestPath);
                } else {
                    const newDestPath = [...splitDestPath, 0];

                    updatedItems = handleMoveToDifferentParent(
                        clonedItems,
                        splitSrcPath,
                        newDestPath
                    );
                }
            }
        }

        setItems(updatedItems);
        onDropItem?.(updatedItems);
    };

    return (
        <DndContextProvider onDrop={onDrop} itemsDictionaryIds={itemsDictionaryIds}>
            <EditorCustomDragLayer />
            <DragAndDrop<HTMLDivElement>
                dragItem={{
                    id: "container",
                    index: 0,
                    parentId: "container",
                    type: "container",
                }}
                accept={[DraggableTypes.ListItem]}
            >
                {(providedStyle) => {
                    return (
                        <Box
                            ref={providedStyle.ref}
                            sx={{ ...((providedStyle.style ? providedStyle.style : {}) as any) }}
                        >
                            <EditorItemsList
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
                                isDragAndDropEnabled={isDragAndDropEnabled}
                            />
                        </Box>
                    );
                }}
            </DragAndDrop>
        </DndContextProvider>
    );
};

export default EditorItemsList;
