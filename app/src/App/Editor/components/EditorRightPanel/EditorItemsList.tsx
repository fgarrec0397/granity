import { DictionaryValue, HasCallableChildren } from "@app/Common/commonTypes";
import { StyledWrapperProps, Typography } from "@app/Common/components/Html";
import Button, { ButtonStylesProps } from "@app/Common/components/Html/Button/Button";
import Collapse from "@app/Common/components/Html/Collapse/Collapse";
import Garbage from "@app/Common/components/Html/Icons/Garbage";
import Modal, { ModalProps } from "@app/Common/components/Html/Modal/Modal";
import { TypographyStylesProps } from "@app/Common/components/Html/Typography";
import { ScenesDictionary } from "@app/Scenes/_actions/scenesTypes";
import { WidgetDictionary } from "@app/Widgets/_actions/widgetsTypes";
import { getColor, getTypography, pxToRem } from "@themes/utils";
import { DisclosureState } from "ariakit";
import { css } from "styled-components";

import ActionItemRow from "./ActionItemRow";

type EditorItemsListProps<T extends WidgetDictionary | ScenesDictionary> = {
    itemsDictionary: T;
    title: string;
    noItemsText: string;
    triggerButtonText: string;
    acceptButton?: ModalProps["acceptButton"];
    cancelButton?: ModalProps["cancelButton"];
    handleClickRow?: (row: DictionaryValue<T>) => void;
    handleClickRemove?: (id: string) => void;
    isActionRowSelected?: (row: DictionaryValue<T>) => boolean;
} & HasCallableChildren<DisclosureState>;

type EditorItemsListStyles = {
    deleteButton?: ButtonStylesProps;
    addItemButton?: ButtonStylesProps;
    itemWrapper?: StyledWrapperProps;
    noItemsText?: TypographyStylesProps;
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
};

const EditorItemsList = <T extends WidgetDictionary | ScenesDictionary>({
    itemsDictionary,
    title,
    noItemsText,
    triggerButtonText,
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
                    const { name } = itemsDictionary[id];

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
                            {name}
                            <Button
                                styleType="none"
                                onClick={() => handleClickRemove?.(id)}
                                {...styles.deleteButton}
                            >
                                <Garbage />
                            </Button>
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
