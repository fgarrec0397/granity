import { EditorListDragItem, WidgetsIds } from "@engine/api";
import { clone, cloneDeep, RecursiveObjectWithChildren } from "@granity/helpers";

export const splitPath = (itemPath?: string) => {
    if (!itemPath) {
        return [];
    }

    return itemPath.split("/").map((x) => Number(x));
};

export const getChild = (
    itemsDictionaryIds: WidgetsIds,
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
    itemsDictionaryIds: WidgetsIds,
    splitSourcePath: number[]
): string[] => {
    const parentIds: string[] = [];

    const traverse = (items: WidgetsIds, itemPath: number[], currentIndex = 0) => {
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

export const isChildItem = (item: EditorListDragItem) => {
    return item.path.match(/\//gm);
};

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

export const updatePaths = (items: WidgetsIds, parentPath?: string): WidgetsIds => {
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
    children: WidgetsIds,
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

export const removeChildFromChildren = (children: WidgetsIds, splitSourcePath: number[]) => {
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
    children: WidgetsIds,
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
    itemsDictionaryIds: WidgetsIds,
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
    itemsDictionaryIds: WidgetsIds,
    splitSourcePath: number[],
    splitDestinationPath: number[]
) => {
    const sourceItem = getChild(itemsDictionaryIds, splitSourcePath);

    let updatedItems = clone(itemsDictionaryIds);

    updatedItems = removeChildFromChildren(updatedItems, splitSourcePath);
    updatedItems = addChildToChildren(updatedItems, splitDestinationPath, sourceItem);

    // Instead of updating all paths each time, check to doing it directly in the function
    return updatePaths(updatedItems);
};

export const handleUnNest = (
    itemsDictionaryIds: WidgetsIds,
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
    itemsDictionaryIds: WidgetsIds,
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
    itemsDictionaryIds: WidgetsIds,
    splitSourcePath: number[]
) => {
    // Instead of updating all paths each time, check to doing it directly in the function
    return updatePaths(removeChildFromChildren(itemsDictionaryIds, splitSourcePath));
};
