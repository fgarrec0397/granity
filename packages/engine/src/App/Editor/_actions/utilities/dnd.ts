import { EditorListDragItem, WidgetsIds } from "@engine/api";
import { RecursiveObjectWithChildren } from "@granity/helpers";

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
    splitDropZonePath: string[],
    splitItemPath: string[]
) => {
    if (splitDropZonePath.length === 1) {
        const dropZoneIndex = Number(splitDropZonePath[0]);
        const itemIndex = Number(splitItemPath[0]);
        return reorder(children, itemIndex, dropZoneIndex);
    }

    const updatedChildren = [...children];

    const curIndex = Number(splitDropZonePath.slice(0, 1));

    // Update the specific node's children
    const splitDropZoneChildrenPath = splitDropZonePath.slice(1);
    const splitItemChildrenPath = splitItemPath.slice(1);
    const nodeChildren = updatedChildren[curIndex];
    updatedChildren[curIndex] = {
        ...nodeChildren,
        children: reorderChildren(
            nodeChildren.children!,
            splitDropZoneChildrenPath,
            splitItemChildrenPath
        ),
    };

    return updatedChildren;
};

export const removeChildFromChildren = (children: WidgetsIds, splitItemPath: string[]) => {
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
    splitDropZonePath: string[],
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
    splitDropZonePath: string[],
    splitItemPath: string[]
) => {
    return reorderChildren(itemsDictionaryIds, splitDropZonePath, splitItemPath);
};

export const handleRemoveItemFromList = (
    itemsDictionaryIds: WidgetsIds,
    splitItemPath: string[]
) => {
    return removeChildFromChildren(itemsDictionaryIds, splitItemPath);
};
