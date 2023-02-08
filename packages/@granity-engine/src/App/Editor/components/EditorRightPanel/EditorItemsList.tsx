import { DictionaryValue, HasChildren } from "@granity/helpers";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    BoxProps,
    Button,
    ButtonProps,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Modal,
    Typography,
    TypographyProps,
} from "@granity/ui";
import { ScenesDictionary } from "@granity-engine/App/Scenes/_actions/scenesTypes";
import { WidgetDictionary } from "@granity-engine/App/Widgets/_actions/widgetsTypes";
import { Garbage } from "@granity-engine/Theme/components/Icons";
import { ReactElement } from "react";

type EditorItemsListProps<T extends WidgetDictionary | ScenesDictionary> = {
    itemsDictionary: T;
    title: string;
    noItemsText: string;
    triggerButtonText: string;
    editModal?: (row: DictionaryValue<T>) => ReactElement;
    acceptButton?: ButtonProps;
    cancelButton?: ButtonProps;
    displayItemName?: (id: string) => string | undefined;
    handleClickRow?: (row: DictionaryValue<T>) => void;
    handleClickRemove?: (id: string) => void;
    isActionRowSelected?: (row: DictionaryValue<T>) => boolean;
} & HasChildren;

type EditorItemsListStyles = {
    deleteButton?: ButtonProps;
    addItemButton?: ButtonProps;
    itemWrapper?: BoxProps;
    noItemsText?: TypographyProps;
    actionsWrapper?: BoxProps;
};

const styles: EditorItemsListStyles = {
    // noItemsText: {
    //     css: css`
    //         color: ${getColor("common.textDisabled")};
    //         font-size: ${getTypography("size.smaller")};
    //         font-style: italic;
    //     `,
    // },
    // actionsWrapper: {
    //     css: css`
    //         display: flex;
    //         align-items: center;
    //         & > * {
    //             margin-left: ${pxToRem(8)};
    //         }
    //     `,
    // },
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
    return (
        <Accordion>
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
                {/* <Button fullWidth {...styles.addItemButton}>
                    {triggerButtonText}
                </Button> */}
            </AccordionDetails>
            {/* <Modal
                title={title}
                // acceptButton={acceptButton}
                // cancelButton={cancelButton}
                trigger={}
            >
                {children as any}
            </Modal> */}
        </Accordion>
    );
};

export default EditorItemsList;
