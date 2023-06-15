import { useAccordionDefaultOpened } from "@engine/Theme/hooks/accordion";
import { HasCallableChildren, RecursiveArrayOfIds } from "@granity/helpers";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    BoxProps,
    Button,
    ButtonProps,
} from "@granity/ui";
import { ReactElement, useState } from "react";

import EditorModal from "../EditorCommon/EditorModal";
import EditorItemsList from "./EditorItemsList";

export type EditorAccordionListButtonProps = {
    text: string;
    callback?: () => void;
};

export type EditorAccordionListProps = {
    itemsDictionaryIds: RecursiveArrayOfIds<string>;
    title: string;
    noItemsText: string;
    triggerButtonText: string;
    editModal?: (id: string) => ReactElement;
    isVisible?: (id: string) => boolean | undefined;
    isDefault?: (id: string) => boolean | undefined;
    handleVisibility?: (id: string) => void;
    acceptButton?: EditorAccordionListButtonProps;
    cancelButton?: EditorAccordionListButtonProps;
    displayItemName?: (id: string) => string | undefined;
    handleClickRow?: (id: string) => void;
    handleClickRemove?: (id: string) => void;
    isActionRowSelected?: (id: string) => boolean;
    isItemNesting?: (id: string) => boolean;
    onIsNestingChange?: (id: string, isNesting: boolean) => void;
    onDropItem?: (newItems: RecursiveArrayOfIds<string>) => void;
    hasDropWhenNesting?: (hoveredItemId: string, draggingItemId: string) => void;
} & HasCallableChildren<{
    handleClose: () => void;
    handleOpen: () => void;
}>;

type EditorAccordionListStyles = {
    deleteButton?: ButtonProps;
    addItemButton?: ButtonProps;
    acceptButton?: ButtonProps;
    cancelButton?: ButtonProps;
    itemWrapper?: BoxProps;
    actionsWrapper?: BoxProps;
};

const styles: EditorAccordionListStyles = {
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

const EditorAccordionList = ({
    itemsDictionaryIds,
    title,
    noItemsText,
    triggerButtonText,
    acceptButton,
    cancelButton,
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
    children,
}: EditorAccordionListProps) => {
    const openedAccordion = useAccordionDefaultOpened();
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);

    const handleOpen = () => setIsEditorModalOpen(true);
    const handleClose = () => setIsEditorModalOpen(false);

    return (
        <Accordion {...openedAccordion}>
            <AccordionSummary>{title}</AccordionSummary>
            <AccordionDetails>
                <EditorItemsList
                    itemsDictionaryIds={itemsDictionaryIds}
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

export default EditorAccordionList;
