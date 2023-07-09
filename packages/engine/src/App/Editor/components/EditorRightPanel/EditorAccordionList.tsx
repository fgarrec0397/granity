import { IdsArrayItem } from "@engine/api";
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
import { EditorItemsListContainer } from "./EditorItemsList";

export type EditorAccordionListButtonProps = {
    text: string;
    callback?: () => void;
};

export type EditorAccordionListProps = {
    itemsDictionaryIds: RecursiveArrayOfIds<string>;
    title: string;
    noItemsText: string;
    triggerButtonText: string;
    acceptButton?: EditorAccordionListButtonProps;
    cancelButton?: EditorAccordionListButtonProps;
    isDragAndDropEnabled?: boolean;
    editModal?: (id: string) => ReactElement;
    isDefault?: (id: string) => boolean | undefined;
    displayItemName?: (id: string) => string | undefined;
    handleClickRow?: (id: string) => void;
    isActionRowSelected?: (id: string) => boolean;
    isVisible?: (id: IdsArrayItem) => boolean | undefined;
    handleVisibility?: (id: IdsArrayItem) => void;
    handleClickRemove?: (id: IdsArrayItem) => void;
    onDropItem?: (newItems: RecursiveArrayOfIds<string>) => void;
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
    isDragAndDropEnabled,
    onDropItem,
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
                <EditorItemsListContainer
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
                    onDropItem={onDropItem}
                    isDragAndDropEnabled={isDragAndDropEnabled}
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
