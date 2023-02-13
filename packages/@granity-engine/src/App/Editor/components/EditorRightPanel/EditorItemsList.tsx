import { HasCallableChildren } from "@granity/helpers";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    BoxProps,
    Button,
    ButtonProps,
    IconButton,
    Icons,
    List,
    ListItem,
    ListItemButton,
    Typography,
    TypographyProps,
} from "@granity/ui";
import { useAccordionDefaultOpened } from "@granity-engine/Theme/hooks/accordion";
import { ReactElement, useState } from "react";

import EditorModal from "../EditorCommon/EditorModal";

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
    acceptButton?: EditorItemsListButtonProps;
    cancelButton?: EditorItemsListButtonProps;
    displayItemName?: (id: string) => string | undefined;
    handleClickRow?: (id: string) => void;
    handleClickRemove?: (id: string) => void;
    isActionRowSelected?: (id: string) => boolean;
} & HasCallableChildren<{
    handleClose: () => void;
    handleOpen: () => void;
}>;

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
    displayItemName,
    handleClickRow,
    handleClickRemove,
    isActionRowSelected,
    acceptButton,
    cancelButton,
    children,
}: EditorItemsListProps) => {
    const openedAccordion = useAccordionDefaultOpened();
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);

    const handleOpen = () => setIsEditorModalOpen(true);
    const handleClose = () => setIsEditorModalOpen(false);

    return (
        <Accordion {...openedAccordion}>
            <AccordionSummary>{title}</AccordionSummary>
            <AccordionDetails>
                <List>
                    {itemsDictionaryIds.length > 0 ? (
                        itemsDictionaryIds.map((id) => {
                            const itemName = displayItemName ? displayItemName(id) : undefined;

                            return (
                                <ListItem
                                    key={id}
                                    secondaryAction={
                                        <>
                                            {editModal?.(id)}
                                            <IconButton onClick={() => handleClickRemove?.(id)}>
                                                <Icons.Delete fontSize="small" />
                                            </IconButton>
                                        </>
                                    }
                                    disablePadding
                                >
                                    <ListItemButton
                                        onClick={() => handleClickRow?.(id)}
                                        selected={isActionRowSelected?.(id)}
                                    >
                                        {itemName}
                                    </ListItemButton>
                                </ListItem>
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
