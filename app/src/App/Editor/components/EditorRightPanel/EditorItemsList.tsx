import { DictionaryValue, HasCallableChildren } from "@app/Common/commonTypes";
import { StyledWrapper, StyledWrapperProps } from "@app/Common/components/Html";
import Button, { ButtonStylesProps } from "@app/Common/components/Html/Button/Button";
import Collapse from "@app/Common/components/Html/Collapse/Collapse";
import Garbage from "@app/Common/components/Html/Icons/Garbage";
import Modal, { ModalProps } from "@app/Common/components/Html/Modal/Modal";
import { ScenesDictionary, ScenesDictionaryItem } from "@app/Scenes/_actions/scenesTypes";
import { WidgetDictionary, WidgetDictionaryItem } from "@app/Widgets/_actions/widgetsTypes";
import { getColor, pxToRem } from "@themes/utils";
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
    itemWrapper: {
        css: css`
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(4, 1fr);
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
            {Object.keys(itemsDictionary).length > 0
                ? Object.keys(itemsDictionary).map((id) => (
                      <ActionItemRow
                          key={id}
                          onClick={() =>
                              handleClickRow?.(itemsDictionary[id] as DictionaryValue<T>)
                          }
                          isSelected={isActionRowSelected?.(
                              itemsDictionary[id] as DictionaryValue<T>
                          )}
                      >
                          {"widgetDefinition" in itemsDictionary[id]
                              ? (itemsDictionary[id] as WidgetDictionaryItem).widgetDefinition.name
                              : (itemsDictionary[id] as ScenesDictionaryItem).name}
                          <Button
                              styleType="none"
                              onClick={() => handleClickRemove?.(id)}
                              {...styles.deleteButton}
                          >
                              <Garbage />
                          </Button>
                      </ActionItemRow>
                  ))
                : noItemsText}
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
                {(state) => (
                    <>
                        <StyledWrapper {...styles.itemWrapper}>{children(state)}</StyledWrapper>
                    </>
                )}
            </Modal>
        </Collapse>
    );
};

export default EditorItemsList;
