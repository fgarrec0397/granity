import { useScenes, useWidgets } from "@engine/api";
import { clone, RecursiveArrayOfIds } from "@granity/helpers";
import { Box, List, pxToRem, Typography } from "@granity/ui";
import { FC, ReactElement, useCallback, useEffect, useState } from "react";

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
    moveItem?: (dragIndex: number, hoverIndex: number | number[]) => void;
    dropItem?: (isNesting: boolean) => void;
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
    moveItem,
    dropItem,
}: EditorItemsListProps) => {
    // const [items, setItems] = useState(itemsDictionaryIds);

    const { displayWidgetName } = useWidgets();
    const { displaySceneName } = useScenes();

    // useEffect(() => {
    //     console.log(itemsDictionaryIds, "itemsDictionaryIds");

    //     setItems(itemsDictionaryIds);
    // }, [itemsDictionaryIds]);

    // const moveItem = useCallback(
    //     (dragIndex: number, hoverIndex: number | number[]) => {
    //         const clonedItems = clone(items);

    //         // if (typeof hoverIndex !== "number") {
    //         //     let getNestedArrayValueString = "";

    //         //     hoverIndex.forEach((x, index) => {
    //         //         getNestedArrayValueString += `[${x}]`;

    //         //         if (index < hoverIndex.length - 1) {
    //         //             getNestedArrayValueString += `["children"]`;
    //         //         }
    //         //     });

    //         //     console.log(getNestedArrayValueString, "getNestedArrayValueString");

    //         //     const evalString = `clonedItems${getNestedArrayValueString}`;
    //         //     console.log(clonedItems, "clonedItems");
    //         //     console.log(evalString, "evalString");

    //         //     const testVar = eval(evalString);

    //         //     console.log(testVar, "testVar");
    //         //     return setItems(clonedItems);
    //         // }

    //         if (typeof hoverIndex === "number") {
    //             // Check to keep this part for fist level
    //             const removedItem = clonedItems.splice(dragIndex, 1);
    //             clonedItems.splice(hoverIndex, 0, ...removedItem);
    //             console.log(clonedItems);

    //             setItems(clonedItems);
    //         }
    //     },
    //     [items]
    // );

    // const dropItem = useCallback(() => {
    //     onDropItem?.(items);
    // }, [items, onDropItem]);

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
    hasDropWhenNesting,
}) => {
    const [items, setItems] = useState(itemsDictionaryIds);

    useEffect(() => {
        // console.log(itemsDictionaryIds, "itemsDictionaryIds");

        setItems(itemsDictionaryIds);
    }, [itemsDictionaryIds]);

    const moveItem = useCallback((dragIndex: number, hoverIndex: number | number[]) => {
        console.log({ dragIndex, hoverIndex }, "moveItem");

        // const clonedItems = clone(items);
        // if (typeof hoverIndex !== "number") {
        //     let getNestedArrayValueString = "";
        //     hoverIndex.forEach((x, index) => {
        //         getNestedArrayValueString += `[${x}]`;
        //         if (index < hoverIndex.length - 1) {
        //             getNestedArrayValueString += `["children"]`;
        //         }
        //     });
        //     console.log(getNestedArrayValueString, "getNestedArrayValueString");
        //     const evalString = `clonedItems${getNestedArrayValueString}`;
        //     console.log(clonedItems, "clonedItems");
        //     console.log(evalString, "evalString");
        //     const testVar = eval(evalString);
        //     console.log(testVar, "testVar");
        //     return setItems(clonedItems);
        // }
        // if (typeof hoverIndex === "number") {
        //     // Check to keep this part for fist level
        //     const removedItem = clonedItems.splice(dragIndex, 1);
        //     clonedItems.splice(hoverIndex, 0, ...removedItem);
        //     console.log(clonedItems);
        //     setItems(clonedItems);
        // }
    }, []);

    const dropItem = useCallback(
        (isNesting: boolean) => {
            console.log(isNesting, "isNesting");

            onDropItem?.(items);
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
            hasDropWhenNesting={hasDropWhenNesting}
        />
    );
};

export default EditorItemsList;
