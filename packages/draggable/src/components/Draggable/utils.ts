import {
    clone,
    cloneDeep,
    RecursiveArrayOfIds,
    RecursiveObjectWithChildren,
} from "@granity/helpers";
import { SxProps } from "@granity/ui";
import { RefObject } from "react";
import { DropTargetMonitor, XYCoord } from "react-dnd";

import { DragSourceMonitor } from "../..";
import { DraggingStatus } from "../Provider/DndContextProvider";
import { DragItem, DragItemRaw, DropResult, DropResultItem, MarginType } from "../types";

export const getElementMargin = <Element extends HTMLElement>(element: Element | null) => {
    if (!element) {
        return {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        };
    }

    // const rect = element?.getBoundingClientRect();
    const computedStyle = getComputedStyle(element);
    const marginTop = computedStyle.getPropertyValue("margin-top").replace("px", "");
    const marginBottom = computedStyle.getPropertyValue("margin-bottom").replace("px", "");
    const marginLeft = computedStyle.getPropertyValue("margin-left").replace("px", "");
    const marginRight = computedStyle.getPropertyValue("margin-right").replace("px", "");

    return {
        left: parseInt(marginLeft),
        right: parseInt(marginRight),
        top: parseInt(marginTop),
        bottom: parseInt(marginBottom),
    };
};

type HandleHoverParams<RefType extends HTMLElement> = {
    sourceItem: DragItemRaw;
    destinationItem: DragItemRaw;
    ref: RefObject<RefType>;
    threesholdIndex: number;
    setThreesholdIndex: (index: number) => void;
    setDestination: (item?: DropResultItem) => void;
    horizontal?: boolean;
    hasDropped: boolean;
    setHasDropped: (hasDropped: boolean) => void;
    setDraggingStatus: (status?: DraggingStatus) => void;
    setDropType: (dropType: "move" | "combine") => void;
    dropType: "move" | "combine";
    itemsDictionaryIds: RecursiveArrayOfIds<string>;
};

const getElementHeight = <RefType extends HTMLElement>(ref: RefObject<RefType>) => {
    const hoverBoundingRect = ref.current?.getBoundingClientRect();

    if (!hoverBoundingRect?.bottom && !hoverBoundingRect?.top) {
        return;
    }

    return hoverBoundingRect?.bottom - hoverBoundingRect?.top;
};

export const handleHover = <RefType extends HTMLElement>(
    monitor: DropTargetMonitor<DragItem, DropResult>,
    {
        sourceItem,
        destinationItem,
        ref,
        threesholdIndex,
        setThreesholdIndex,
        horizontal,
        setDropType,
        setDraggingStatus,
        itemsDictionaryIds,
        setDestination,
        hasDropped,
        setHasDropped,
    }: HandleHoverParams<RefType>
) => {
    const isDropTarget = monitor.isOver({ shallow: true });

    if (hasDropped) {
        setHasDropped(false);
    }

    if (!isDropTarget) return;

    if (!ref.current) {
        return;
    }

    const parentDestinationItem = getParent(itemsDictionaryIds, destinationItem.path);
    const parentChildren = parentDestinationItem.children || parentDestinationItem;

    const isSameSource = sourceItem.parentId === destinationItem.parentId;
    const dragIndex = sourceItem.index;
    const hoverIndex = destinationItem.index;

    const xyCoordinate = horizontal ? "x" : "y";
    const marginKeys = horizontal
        ? ({ first: "left", last: "right" } as const)
        : ({ first: "top", last: "bottom" } as const);

    // if (isSameSource) {
    // Don't replace items with themselves
    if (dragIndex === hoverIndex && sourceItem.parentId === destinationItem.parentId) {
        return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = ref.current?.getBoundingClientRect();

    // Get vertical height
    const hoverItemHeight = getElementHeight(ref);

    if (!hoverItemHeight) {
        return;
    }

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY =
        (clientOffset as XYCoord)[xyCoordinate] - hoverBoundingRect[marginKeys.first];

    console.log({ hoverIndex, dragIndex });

    // Dragging downwards
    if (dragIndex < hoverIndex) {
        if (hoverClientY < 5) {
            setDraggingStatus({
                draggingDirection: "downward",
                draggingType: "canMovePrev",
            });
            setThreesholdIndex(hoverIndex - 1);
            setDestination({
                ...parentChildren[hoverIndex - 1],
                parentId: destinationItem.parentId,
                index: destinationItem.index - 1,
            });
            setDropType("move");

            return;
        }

        if (hoverClientY > hoverItemHeight - 5) {
            setDraggingStatus({
                draggingDirection: "downward",
                draggingType: "canMoveNext",
            });
            setThreesholdIndex(hoverIndex);
            setDestination({
                ...parentChildren[hoverIndex],
                parentId: destinationItem.parentId,
                index: destinationItem.index,
            });
            setDropType("move");

            return;
        }

        setDestination(destinationItem);
        console.log(parentChildren[hoverIndex], "combine downwards destinationItem");
        setThreesholdIndex(hoverIndex);
        setDropType("combine");

        return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex) {
        if (hoverClientY > hoverItemHeight - 5) {
            setDraggingStatus({
                draggingDirection: "upward",
                draggingType: "canMoveNext",
            });

            setThreesholdIndex(hoverIndex + 1);
            setDestination({
                ...parentChildren[hoverIndex + 1],
                parentId: destinationItem.parentId,
                index: destinationItem.index + 1,
            });

            setDropType("move");

            return;
        }

        if (hoverClientY < 5) {
            setDraggingStatus({
                draggingDirection: "upward",
                draggingType: "canMovePrev",
            });
            setThreesholdIndex(hoverIndex);
            setDestination({
                ...parentChildren[hoverIndex],
                parentId: destinationItem.parentId,
                index: destinationItem.index,
            });
            setDropType("move");

            return;
        }

        setThreesholdIndex(hoverIndex);
        setDestination(destinationItem);
        console.log(parentChildren[hoverIndex], "combine upwards destinationItem");

        // setDestination({
        //     ...parentChildren[hoverIndex],
        //     parentId: destinationItem.parentId,
        //     index: destinationItem.index,
        // });
        setDropType("combine");

        return;
    }

    setThreesholdIndex(hoverIndex);
    // } else {
    //     // Determine rectangle on screen
    //     const hoverBoundingRect = ref.current?.getBoundingClientRect();

    //     const hoverItemHeight = getElementHeight(ref);

    //     // Get vertical middle
    //     const hoverMiddleY =
    //         (hoverBoundingRect[marginKeys.last] - hoverBoundingRect[marginKeys.first]) / 2;

    //     // Determine mouse position
    //     const clientOffset = monitor.getClientOffset();

    //     // Get pixels to the top
    //     const hoverClientY =
    //         (clientOffset as XYCoord)[xyCoordinate] - hoverBoundingRect[marginKeys.first];

    //     console.log(
    //         { hoverClientY, hoverItemHeight, hoverIndex, threesholdIndex },
    //         "is not same source"
    //     );

    //     if (threesholdIndex <= hoverIndex) {
    //         if (hoverClientY > hoverMiddleY) {
    //             console.log("hoverIndex + 1");
    //             setThreesholdIndex(hoverIndex + 1);
    //         }
    //         return;
    //     } else {
    //         if (hoverClientY < hoverMiddleY) {
    //             console.log("hoverIndex");
    //             setThreesholdIndex(hoverIndex);
    //         }
    //     }
    // }
};

export const handleStyle = <RefType extends HTMLElement>(
    monitor: DragSourceMonitor<DragItem, DropResult>,
    {
        sourceItem,
        destinationItem,
        isDragging,
        threesholdIndex,
        dropType,
        ref,
        draggingStatus,
        hasDropped,
    }: {
        sourceItem: DragItemRaw;
        destinationItem: DragItemRaw;
        isDragging: boolean;
        horizontal?: boolean;
        threesholdIndex: number;
        isParentActive: boolean;
        domRect?: DOMRect;
        margin?: MarginType;
        isOver: boolean;
        dropType: "combine" | "move";
        ref: RefObject<RefType>;
        draggingStatus?: DraggingStatus;
        hasDropped: boolean;
    }
) => {
    if (!ref.current) {
        return;
    }

    const isSameSource = sourceItem?.parentId === destinationItem.parentId;

    if (isSameSource) {
        const backgroundColor: SxProps = {
            backgroundColor:
                !hasDropped && dropType === "combine" && threesholdIndex === destinationItem.index
                    ? "#ffffff50"
                    : "transparent",
        };

        const displayTopBar =
            (draggingStatus?.draggingType === "canMovePrev" &&
                draggingStatus?.draggingDirection === "upward" &&
                destinationItem.index === threesholdIndex) ||
            (draggingStatus?.draggingType === "canMovePrev" &&
                draggingStatus?.draggingDirection === "downward" &&
                destinationItem.index === threesholdIndex + 1);
        const displayBottomBar =
            (draggingStatus?.draggingType === "canMoveNext" &&
                draggingStatus?.draggingDirection === "upward" &&
                destinationItem.index === threesholdIndex - 1) ||
            (draggingStatus?.draggingType === "canMoveNext" &&
                draggingStatus?.draggingDirection === "downward" &&
                destinationItem.index === threesholdIndex);

        const displaymBar =
            dropType === "move" && !hasDropped && (displayTopBar || displayBottomBar);

        const border: SxProps = {
            "&::after": {
                content: '""',
                position: "absolute",
                ...(displayBottomBar && { bottom: 0 }),
                ...(displayTopBar && { top: 0 }),
                display: displaymBar ? "block" : "none",
                height: "3px",
                width: "100%",
                backgroundColor: "#ffffff50",
            },
        };
        const style: SxProps = {
            ...border,
            ...backgroundColor,
        };

        return { style };
    } else {
        const backgroundColor: SxProps = {
            backgroundColor:
                !hasDropped && dropType === "combine" && threesholdIndex === destinationItem.index
                    ? "#ffffff50"
                    : "transparent",
        };

        const displayTopBar =
            (draggingStatus?.draggingType === "canMovePrev" &&
                draggingStatus?.draggingDirection === "upward" &&
                destinationItem.index === threesholdIndex) ||
            (draggingStatus?.draggingType === "canMovePrev" &&
                draggingStatus?.draggingDirection === "downward" &&
                destinationItem.index === threesholdIndex + 1);
        const displayBottomBar =
            (draggingStatus?.draggingType === "canMoveNext" &&
                draggingStatus?.draggingDirection === "upward" &&
                destinationItem.index === threesholdIndex - 1) ||
            (draggingStatus?.draggingType === "canMoveNext" &&
                draggingStatus?.draggingDirection === "downward" &&
                destinationItem.index === threesholdIndex);

        const displaymBar =
            dropType === "move" && !hasDropped && (displayTopBar || displayBottomBar);

        const border: SxProps = {
            "&::after": {
                content: '""',
                position: "absolute",
                ...(displayBottomBar && { bottom: 0 }),
                ...(displayTopBar && { top: 0 }),
                display: displaymBar ? "block" : "none",
                height: "3px",
                width: "100%",
                backgroundColor: "#ffffff50",
            },
        };
        const style: SxProps = {
            ...border,
            ...backgroundColor,
        };

        return { style };
    }
};

export const splitPath = (itemPath?: string) => {
    if (!itemPath) {
        return [];
    }

    return itemPath.split("/").map((x) => Number(x));
};

export const getParent = (itemsDictionaryIds: RecursiveArrayOfIds<string>, itemPath?: string) => {
    const itemSplitPath = splitPath(itemPath);

    itemSplitPath.pop();

    return getChild(itemsDictionaryIds, itemSplitPath);
};

export const getChild = (
    itemsDictionaryIds: RecursiveArrayOfIds<string>,
    splitSourcePath: number[]
): RecursiveObjectWithChildren<{ id: string }> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const clonedItems = clone(itemsDictionaryIds);

    let evalClonedItemsValue;
    let getNestedArrayValueString = "";

    splitSourcePath.forEach((x, index) => {
        getNestedArrayValueString += `[${x}]`;

        if (index < splitSourcePath.length - 1) {
            getNestedArrayValueString += `["children"]`;
        }
    });

    const evalClonedItemsString = `clonedItems${getNestedArrayValueString}`;

    try {
        evalClonedItemsValue = eval(evalClonedItemsString);
    } catch (error) {
        console.error(error);
    }

    return evalClonedItemsValue;
};

export const getParentIds = (
    itemsDictionaryIds: RecursiveArrayOfIds<string>,
    splitSourcePath: number[]
): string[] => {
    const parentIds: string[] = [];

    const traverse = (items: RecursiveArrayOfIds<string>, itemPath: number[], currentIndex = 0) => {
        let currentId;

        items.forEach((x, index) => {
            if (itemPath[currentIndex] === index) {
                parentIds.push(x.id);

                if (x.children) {
                    currentId = traverse(x.children, itemPath.slice(1), currentIndex++);
                } else {
                    currentId = x.id;
                }
            }
        });

        return currentId;
    };

    traverse(itemsDictionaryIds, splitSourcePath);

    parentIds.pop();

    return parentIds;
};

// export const isChildItem = (item: EditorListDragItem) => {
//     return item.path.match(/\//gm);
// };

// a little function to help us with reordering the result
export const reorder = <ListType>(list: ListType[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed); // inserting task in new index

    return result;
};

export const remove = <ArrayType>(arr: ArrayType[], index: number) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // part of the array after the specified index
    ...arr.slice(index + 1),
];

export const insert = <ArrayType, ItemType>(arr: ArrayType[], index: number, newItem: ItemType) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index),
];

const updatePaths = (
    items: RecursiveArrayOfIds<string>,
    parentPath?: string
): RecursiveArrayOfIds<string> => {
    const newItems = cloneDeep(items).map((x, index) => {
        const path = parentPath ? parentPath.concat("/", index.toString()) : index.toString();

        return {
            ...x,
            path,
            children: x.children ? updatePaths(x.children, path) : [],
        };
    });

    return newItems;
};

export const reorderChildren = (
    children: RecursiveArrayOfIds<string>,
    splitSourcePath: number[],
    splitDestinationPath: number[]
) => {
    if (splitDestinationPath.length === 1) {
        const dropZoneIndex = Number(splitDestinationPath[0]);
        const itemIndex = Number(splitSourcePath[0]);
        return reorder(children, itemIndex, dropZoneIndex);
    }

    const updatedChildren = [...children];

    const curIndex = Number(splitDestinationPath.slice(0, 1));

    const splitDropZoneChildrenPath = splitDestinationPath.slice(1);
    const splitItemChildrenPath = splitSourcePath.slice(1);

    const nodeChildren = updatedChildren[curIndex];

    // Update the specific node's children
    updatedChildren[curIndex] = {
        ...nodeChildren,
        path: "",
        children: reorderChildren(
            nodeChildren.children!,
            splitDropZoneChildrenPath,
            splitItemChildrenPath
        ),
    };

    return updatedChildren;
};

export const removeChildFromChildren = (
    children: RecursiveArrayOfIds<string>,
    splitSourcePath: number[]
) => {
    if (splitSourcePath.length === 1) {
        const itemIndex = Number(splitSourcePath[0]);
        return remove(children, itemIndex);
    }

    const updatedChildren = [...children];

    const curIndex = Number(splitSourcePath.slice(0, 1));

    // Update the specific node's children
    const splitItemChildrenPath = splitSourcePath.slice(1);
    const nodeChildren = updatedChildren[curIndex];

    updatedChildren[curIndex] = {
        ...nodeChildren,
        children: removeChildFromChildren(nodeChildren.children!, splitItemChildrenPath),
    };

    return updatedChildren;
};

export const addChildToChildren = (
    children: RecursiveArrayOfIds<string>,
    splitDestinationPath: number[],
    item: RecursiveObjectWithChildren<{ id: string }>
) => {
    if (splitDestinationPath.length === 1) {
        const dropZoneIndex = Number(splitDestinationPath[0]);
        return insert(children, dropZoneIndex, item);
    }

    const updatedChildren = [...children];

    const currentDropZoneIndex = Number(splitDestinationPath.slice(0, 1));

    // Update the specific node's children
    const splitItemChildrenPath = splitDestinationPath.slice(1);
    const nodeChildren = updatedChildren[currentDropZoneIndex];

    updatedChildren[currentDropZoneIndex] = {
        ...nodeChildren,
        children: addChildToChildren(nodeChildren?.children || [], splitItemChildrenPath, item),
    };

    return updatedChildren;
};

export const handleMoveWithinParent = (
    itemsDictionaryIds: RecursiveArrayOfIds<string>,
    splitSourcePath: number[],
    splitDestinationPath: number[]
) => {
    if (splitDestinationPath.length > 0 && splitDestinationPath.length !== splitSourcePath.length) {
        throw new Error("splitDestinationPath and splitSourcePath must have the same length");
    }

    // Instead of updating all paths each time, check to doing it directly in the function
    return updatePaths(reorderChildren(itemsDictionaryIds, splitSourcePath, splitDestinationPath));
};

export const handleMoveToDifferentParent = (
    itemsDictionaryIds: RecursiveArrayOfIds<string>,
    splitSourcePath: number[],
    splitDestinationPath: number[]
) => {
    const sourceItem = getChild(itemsDictionaryIds, splitSourcePath);

    let updatedItems = itemsDictionaryIds;

    updatedItems = addChildToChildren(updatedItems, splitDestinationPath, sourceItem);
    updatedItems = removeChildFromChildren(updatedItems, splitSourcePath);

    // Instead of updating all paths each time, check to doing it directly in the function
    return updatePaths(updatedItems);
};

export const handleUnNest = (
    itemsDictionaryIds: RecursiveArrayOfIds<string>,
    splitSourcePath: number[],
    splitDestinationPath: number[]
) => {
    const sourceItem = getChild(itemsDictionaryIds, splitSourcePath);

    let updatedItems = itemsDictionaryIds;

    updatedItems = removeChildFromChildren(updatedItems, splitSourcePath);
    updatedItems = addChildToChildren(updatedItems, splitDestinationPath, sourceItem);

    // Instead of updating all paths each time, check to doing it directly in the function
    return updatePaths(updatedItems);
};

export const handleNestItem = (
    itemsDictionaryIds: RecursiveArrayOfIds<string>,
    splitSourcePath: number[],
    splitDestinationPath: number[]
) => {
    const destinationItem = getChild(itemsDictionaryIds, splitDestinationPath);
    let newSplitDestinationPath = splitDestinationPath;

    if (!destinationItem.children?.length) {
        newSplitDestinationPath = [...newSplitDestinationPath, 0];
    }

    return handleMoveToDifferentParent(
        itemsDictionaryIds,
        splitSourcePath,
        newSplitDestinationPath
    );
};

export const handleRemoveItemFromList = (
    itemsDictionaryIds: RecursiveArrayOfIds<string>,
    splitSourcePath: number[]
) => {
    // Instead of updating all paths each time, check to doing it directly in the function
    return updatePaths(removeChildFromChildren(itemsDictionaryIds, splitSourcePath));
};
