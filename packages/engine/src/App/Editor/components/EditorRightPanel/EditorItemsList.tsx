import { clone, RecursiveIdsArray } from "@granity/helpers";
import { List, Typography } from "@granity/ui";
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
    changeItemsHandler?: (ids: RecursiveIdsArray<string>) => void;
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
    changeItemsHandler,
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
                        return (
                            <EditorItemsList
                                key={id[0]}
                                itemsDictionaryIds={id[1]}
                                noItemsText={noItemsText}
                            />
                        );
                    }

                    const itemName = displayItemName ? displayItemName(id) : undefined;

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
                            moveItem={moveItem}
                        />
                    );
                })
            ) : (
                <Typography>{noItemsText}</Typography>
            )}
        </List>
    );
};

export default EditorItemsList;
