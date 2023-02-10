import { DictionaryValue, HasCallableChildren } from "@granity/helpers";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    BoxProps,
    Button,
    ButtonProps,
    Dialog,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Typography,
    TypographyProps,
} from "@granity/ui";
import {
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@granity/ui/src/Components/Atoms/Dialog/Dialog";
import { ScenesDictionary } from "@granity-engine/App/Scenes/_actions/scenesTypes";
import { WidgetDictionary } from "@granity-engine/App/Widgets/_actions/widgetsTypes";
import { Garbage } from "@granity-engine/Theme/components/Icons";
import { useAccordionDefaultOpened } from "@granity-engine/Theme/hooks/accordion";
import { ReactElement, useState } from "react";

export type EditorItemsListButtonProps = {
    text: string;
    callback?: () => void;
};

export type EditorItemsListProps<T extends WidgetDictionary | ScenesDictionary> = {
    itemsDictionary: T;
    title: string;
    noItemsText: string;
    triggerButtonText: string;
    editModal?: (row: DictionaryValue<T>) => ReactElement;
    acceptButton?: EditorItemsListButtonProps;
    cancelButton?: EditorItemsListButtonProps;
    displayItemName?: (id: string) => string | undefined;
    handleClickRow?: (row: DictionaryValue<T>) => void;
    handleClickRemove?: (id: string) => void;
    isActionRowSelected?: (row: DictionaryValue<T>) => boolean;
} & HasCallableChildren<{
    handleClose: () => void;
    handleOpen: () => void;
}>;

type EditorItemsListStyles = {
    deleteButton?: ButtonProps;
    addItemButton?: ButtonProps;
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
};

const EditorItemsList = <T extends WidgetDictionary | ScenesDictionary>({
    itemsDictionary,
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
}: EditorItemsListProps<T>) => {
    const openedAccordion = useAccordionDefaultOpened();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    const handleAccept = () => {
        acceptButton?.callback?.();
        handleClose();
    };

    const handleCancel = () => {
        cancelButton?.callback?.();
        handleClose();
    };

    return (
        <Accordion {...openedAccordion}>
            <AccordionSummary>{title}</AccordionSummary>
            <AccordionDetails>
                <List>
                    {Object.keys(itemsDictionary).length > 0 ? (
                        Object.keys(itemsDictionary).map((id) => {
                            const itemName = displayItemName
                                ? displayItemName(itemsDictionary[id].id)
                                : itemsDictionary[id].name;

                            return (
                                <ListItem
                                    key={id}
                                    secondaryAction={
                                        <IconButton onClick={() => handleClickRemove?.(id)}>
                                            {editModal?.(itemsDictionary[id] as DictionaryValue<T>)}
                                            <Garbage />
                                        </IconButton>
                                    }
                                    disablePadding
                                >
                                    <ListItemButton
                                        onClick={() =>
                                            handleClickRow?.(
                                                itemsDictionary[id] as DictionaryValue<T>
                                            )
                                        }
                                        selected={isActionRowSelected?.(
                                            itemsDictionary[id] as DictionaryValue<T>
                                        )}
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
            <Dialog
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {children({
                        handleOpen,
                        handleClose,
                    })}
                </DialogContent>
                <DialogActions>
                    {acceptButton && <Button onClick={handleAccept}>{acceptButton.text}</Button>}
                    {cancelButton && (
                        <Button onClick={handleCancel} autoFocus>
                            {cancelButton.text}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Accordion>
    );
};

export default EditorItemsList;
