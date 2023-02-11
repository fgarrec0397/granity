import { DictionaryValue, HasCallableChildren } from "@granity/helpers";
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
import { ScenesDictionary } from "@granity-engine/App/Scenes/_actions/scenesTypes";
import { WidgetDictionary } from "@granity-engine/App/Widgets/_actions/widgetsTypes";
import { useAccordionDefaultOpened } from "@granity-engine/Theme/hooks/accordion";
import { ReactElement, useState } from "react";

import EditorModal from "../EditorCommon/EditorModal";

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
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);

    const handleOpen = () => setIsEditorModalOpen(true);
    const handleClose = () => setIsEditorModalOpen(false);

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
                                        <>
                                            {editModal?.(itemsDictionary[id] as DictionaryValue<T>)}
                                            <IconButton onClick={() => handleClickRemove?.(id)}>
                                                <Icons.Delete fontSize="small" />
                                            </IconButton>
                                        </>
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
