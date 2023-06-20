import { EditorListDragItem, WidgetsIds } from "@engine/api";
import { clone, RecursiveObjectWithChildren } from "@granity/helpers";

// const obj = [
//     {
//         id: "id1",
//         path: "0",
//         children: [
//             {
//                 id: "nestedId1",
//                 path: "0/0",
//                 children: [{ id: "nestedNestedId1", path: "0/0/0" }],
//             },
//             {
//                 id: "nestedId1",
//                 path: "0/1",
//             },
//         ],
//     },
//     {
//         id: "id2",
//         path: "1",
//     },
//     {
//         id: "id3",
//         path: "2",
//     },
// ];

export const getChild = (itemsDictionaryIds: WidgetsIds, splitItemPath: number[]) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const clonedItems = clone(itemsDictionaryIds);

    let evalClonedItemsValue;
    let getNestedArrayValueString = "";

    splitItemPath.forEach((x, index) => {
        getNestedArrayValueString += `[${x}]`;

        if (index < splitItemPath.length - 1) {
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

export const reorderChildren = (
    children: WidgetsIds,
    splitDropZonePath: number[],
    splitItemPath: number[]
) => {
    if (splitDropZonePath.length === 1) {
        const dropZoneIndex = Number(splitDropZonePath[0]);
        const itemIndex = Number(splitItemPath[0]);
        return reorder(children, itemIndex, dropZoneIndex);
    }

    const updatedChildren = [...children];

    const curIndex = Number(splitDropZonePath.slice(0, 1));

    const splitDropZoneChildrenPath = splitDropZonePath.slice(1);
    const splitItemChildrenPath = splitItemPath.slice(1);

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

export const removeChildFromChildren = (children: WidgetsIds, splitItemPath: number[]) => {
    if (splitItemPath.length === 1) {
        const itemIndex = Number(splitItemPath[0]);
        return remove(children, itemIndex);
    }

    const updatedChildren = [...children];

    const curIndex = Number(splitItemPath.slice(0, 1));

    // Update the specific node's children
    const splitItemChildrenPath = splitItemPath.slice(1);
    const nodeChildren = updatedChildren[curIndex];
    updatedChildren[curIndex] = {
        ...nodeChildren,
        children: removeChildFromChildren(nodeChildren.children!, splitItemChildrenPath),
    };

    return updatedChildren;
};

export const addChildToChildren = (
    children: WidgetsIds,
    splitDropZonePath: number[],
    item: RecursiveObjectWithChildren<{ id: string }>
) => {
    if (splitDropZonePath.length === 1) {
        const dropZoneIndex = Number(splitDropZonePath[0]);
        return insert(children, dropZoneIndex, item);
    }

    const updatedChildren = [...children];

    const curIndex = Number(splitDropZonePath.slice(0, 1));

    // Update the specific node's children
    const splitItemChildrenPath = splitDropZonePath.slice(1);
    const nodeChildren = updatedChildren[curIndex];
    updatedChildren[curIndex] = {
        ...nodeChildren,
        children: addChildToChildren(nodeChildren.children!, splitItemChildrenPath, item),
    };

    return updatedChildren;
};

export const handleMoveWithinParent = (
    itemsDictionaryIds: WidgetsIds,
    splitDropZonePath: number[],
    splitItemPath: number[]
) => {
    if (splitDropZonePath.length !== splitItemPath.length) {
        throw new Error("splitDropZonePath and splitItemPath must have the same length");
    }

    return reorderChildren(itemsDictionaryIds, splitDropZonePath, splitItemPath);
};

export const handleMoveToDifferentParent = (
    itemsDictionaryIds: WidgetsIds,
    splitDropZonePath: number[],
    splitItemPath: number[]
    // item: EditorListDragItem
) => {
    let newLayoutStructure;
    const item = getChild(itemsDictionaryIds, splitItemPath);
    console.log(item, "handleMoveToDifferentParent");

    if (splitDropZonePath.length === 1) {
        // Move the item to the root
    }

    if (splitDropZonePath.length > 1) {
        // Move the item as a child
    }

    let updatedItems = itemsDictionaryIds;
    updatedItems = removeChildFromChildren(updatedItems, splitItemPath);
    // updatedItems = handleAddColumDataToRow(updatedItems);
    updatedItems = addChildToChildren(updatedItems, splitDropZonePath, newLayoutStructure);

    return updatedItems;
};

export const handleRemoveItemFromList = (
    itemsDictionaryIds: WidgetsIds,
    splitItemPath: number[]
) => {
    return removeChildFromChildren(itemsDictionaryIds, splitItemPath);
};
