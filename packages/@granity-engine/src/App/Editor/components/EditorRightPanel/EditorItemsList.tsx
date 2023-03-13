import { useAccordionDefaultOpened } from "@granity/engine/Theme/hooks/accordion";
import { HasCallableChildren } from "@granity/helpers";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    BoxProps,
    Button,
    ButtonProps,
    DeleteIcon,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    pxToRem,
    StarIcon,
    Typography,
    TypographyProps,
    VisibilityIcon,
    VisibilityOffIcon,
} from "@granity/ui";
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
    isVisible?: (id: string) => boolean | undefined;
    isDefault?: (id: string) => boolean | undefined;
    handleVisibility?: (id: string) => void;
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
    isVisible,
    isDefault,
    handleVisibility,
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
                                            {handleVisibility && (
                                                <IconButton onClick={() => handleVisibility?.(id)}>
                                                    {isVisible?.(id) ? (
                                                        <VisibilityIcon fontSize="small" />
                                                    ) : (
                                                        <VisibilityOffIcon fontSize="small" />
                                                    )}
                                                </IconButton>
                                            )}
                                            <IconButton onClick={() => handleClickRemove?.(id)}>
                                                <DeleteIcon fontSize="small" />
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
                                        {isDefault?.(id) && (
                                            <StarIcon
                                                sx={{
                                                    fontSize: 10,
                                                    marginLeft: pxToRem(5),
                                                }}
                                            />
                                        )}
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
