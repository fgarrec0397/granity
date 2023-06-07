import { useAccordionDefaultOpened } from "@engine/Theme/hooks/accordion";
import { clone, HasCallableChildren } from "@granity/helpers";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    BoxProps,
    Button,
    ButtonProps,
    List,
    Typography,
    TypographyProps,
} from "@granity/ui";
import { ReactElement, useCallback, useState } from "react";

import EditorModal from "../EditorCommon/EditorModal";
import EditorItemsListItem from "./EditorItemsListItem";

export type EditorItemsListButtonProps = {
    text: string;
    callback?: () => void;
};

export type EditorItemsListProps = {
    itemsDictionaryIds: string[];
    title: string;
    noItemsText: string;
    triggerButtonText: string;
    editModal?: (id: string) => ReactElement;
    isVisible?: (id: string) => boolean | undefined;
    isDefault?: (id: string) => boolean | undefined;
    handleVisibility?: (id: string) => void;
    acceptButton?: EditorItemsListButtonProps;
    cancelButton?: EditorItemsListButtonProps;
    displayItemName?: (id: string) => string | undefined;
    handleClickRow?: (id: string) => void;
    handleClickRemove?: (id: string) => void;
    isActionRowSelected?: (id: string) => boolean;
    changeItemsHandler?: (ids: string[]) => void;
} & HasCallableChildren<{
    handleClose: () => void;
    handleOpen: () => void;
}>;

export interface DragAndDropItem {
    id: number;
    text: string;
}

export interface DragAndDropItemCards {
    cards: DragAndDropItem[];
}

type EditorItemsListStyles = {
    deleteButton?: ButtonProps;
    addItemButton?: ButtonProps;
    acceptButton?: ButtonProps;
    cancelButton?: ButtonProps;
    itemWrapper?: BoxProps;
    noItemsText?: TypographyProps;
    actionsWrapper?: BoxProps;
};

const styles: EditorItemsListStyles = {
    addItemButton: {
        sx: {
            marginTop: 2,
        },
    },
    acceptButton: {
        size: "large",
    },
    cancelButton: {
        variant: "outlined",
        color: "secondary",
        size: "large",
    },
};

const EditorItemsList = ({
    itemsDictionaryIds,
    title,
    noItemsText,
    triggerButtonText,
    editModal,
    isVisible,
    isDefault,
    handleVisibility,
    displayItemName,
    handleClickRow,
    handleClickRemove,
    isActionRowSelected,
    changeItemsHandler,
    acceptButton,
    cancelButton,
    children,
}: EditorItemsListProps) => {
    const openedAccordion = useAccordionDefaultOpened();
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);

    // const [data, setData] = useState<string[]>([]);

    // useEffect(() => {
    //     setData(itemsDictionaryIds);
    // }, [itemsDictionaryIds]);

    const moveItem = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            // setData((prevData) => {
            const clonedPrevData = clone(itemsDictionaryIds);
            const removedItem = clonedPrevData.splice(dragIndex, 1);
            clonedPrevData.splice(hoverIndex, 0, ...removedItem);

            changeItemsHandler?.(clonedPrevData);
            // clonedPrevData;
            // });
        },
        [changeItemsHandler, itemsDictionaryIds]
    );

    const handleOpen = () => setIsEditorModalOpen(true);
    const handleClose = () => setIsEditorModalOpen(false);

    return (
        <Accordion {...openedAccordion}>
            <AccordionSummary>{title}</AccordionSummary>
            <AccordionDetails>
                <List>
                    {itemsDictionaryIds.length > 0 ? (
                        itemsDictionaryIds.map((id, index) => {
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
                        <Typography {...styles.noItemsText}>{noItemsText}</Typography>
                    )}
                </List>
                <Button onClick={handleOpen} fullWidth {...styles.addItemButton}>
                    {triggerButtonText}
                </Button>
            </AccordionDetails>
            <EditorModal
                title={title}
                open={isEditorModalOpen}
                onClose={handleClose}
                acceptButton={acceptButton}
                cancelButton={cancelButton}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {(state) => children(state)}
            </EditorModal>
        </Accordion>
    );
};

export default EditorItemsList;
