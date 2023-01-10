import { StyledWrapper, StyledWrapperProps, Typography } from "@app/Common/components/Html";
import Button, { ButtonStylesProps } from "@app/Common/components/Html/Button/Button";
import Collapse from "@app/Common/components/Html/Collapse/Collapse";
import Garbage from "@app/Common/components/Html/Icons/Garbage";
import Modal, { ModalProps } from "@app/Common/components/Html/Modal/Modal";
import { TypographyStylesProps } from "@app/Common/components/Html/Typography";
import { ScenesDictionary } from "@app/Scenes/_actions/scenesTypes";
import { WidgetDictionary } from "@app/Widgets/_actions/widgetsTypes";
import { getColor, getTypography, pxToRem } from "@themes/utils";
import { DisclosureState } from "ariakit";
import { DictionaryValue, HasCallableChildren } from "helpers-granity";
import { ReactElement } from "react";
import { css } from "styled-components";

import ActionItemRow from "./ActionItemRow";

type EditorItemsListProps<T extends WidgetDictionary | ScenesDictionary> = {
    itemsDictionary: T;
    title: string;
    noItemsText: string;
    triggerButtonText: string;
    editModal?: (row: DictionaryValue<T>) => ReactElement;
    acceptButton?: ModalProps["acceptButton"];
    cancelButton?: ModalProps["cancelButton"];
    displayItemName?: (id: string) => string | undefined;
    handleClickRow?: (row: DictionaryValue<T>) => void;
    handleClickRemove?: (id: string) => void;
    isActionRowSelected?: (row: DictionaryValue<T>) => boolean;
} & HasCallableChildren<DisclosureState>;

type EditorItemsListStyles = {
    deleteButton?: ButtonStylesProps;
    addItemButton?: ButtonStylesProps;
    itemWrapper?: StyledWrapperProps;
    noItemsText?: TypographyStylesProps;
    actionsWrapper?: StyledWrapperProps;
};

const styles: EditorItemsListStyles = {
    deleteButton: {
        css: css`
            color: ${getColor("danger.main")};
        `,
    },
    addItemButton: {
        css: css`
            margin-top: ${pxToRem(15)};
        `,
    },

    noItemsText: {
        css: css`
            color: ${getColor("common.textDisabled")};
            font-size: ${getTypography("size.smaller")};
            font-style: italic;
        `,
    },
    actionsWrapper: {
        css: css`
            display: flex;
            align-items: center;

            & > * {
                margin-left: ${pxToRem(8)};
            }
        `,
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
    return (
        <Collapse title={title}>
            {Object.keys(itemsDictionary).length > 0 ? (
                Object.keys(itemsDictionary).map((id) => {
                    const itemName = displayItemName
                        ? displayItemName(itemsDictionary[id].id)
                        : itemsDictionary[id].name;

                    return (
                        <ActionItemRow
                            key={id}
                            onClick={() =>
                                handleClickRow?.(itemsDictionary[id] as DictionaryValue<T>)
                            }
                            isSelected={isActionRowSelected?.(
                                itemsDictionary[id] as DictionaryValue<T>
                            )}
                        >
                            {itemName}
                            <StyledWrapper {...styles.actionsWrapper}>
                                {editModal?.(itemsDictionary[id] as DictionaryValue<T>)}
                                <Button
                                    styleType="none"
                                    onClick={() => handleClickRemove?.(id)}
                                    {...styles.deleteButton}
                                >
                                    <Garbage />
                                </Button>
                            </StyledWrapper>
                        </ActionItemRow>
                    );
                })
            ) : (
                <Typography {...styles.noItemsText}>{noItemsText}</Typography>
            )}
            <Modal
                title={title}
                size="large"
                acceptButton={acceptButton}
                cancelButton={cancelButton}
                trigger={
                    <Button isFullWidth {...styles.addItemButton}>
                        {triggerButtonText}
                    </Button>
                }
            >
                {(state) => children(state)}
            </Modal>
        </Collapse>
    );
};

export default EditorItemsList;
