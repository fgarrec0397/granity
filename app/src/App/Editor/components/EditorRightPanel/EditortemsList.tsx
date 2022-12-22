import { StyledWrapper, StyledWrapperProps } from "@app/Common/components/Html";
import Button, { ButtonStylesProps } from "@app/Common/components/Html/Button/Button";
import Collapse from "@app/Common/components/Html/Collapse/Collapse";
import Garbage from "@app/Common/components/Html/Icons/Garbage";
import Modal from "@app/Common/components/Html/Modal/Modal";
import { ScenesDictionary, ScenesDictionaryItem } from "@app/Scenes/_actions/scenesTypes";
import useWidgetsModules from "@app/Widgets/_actions/hooks/useWidgetsModules";
import mapWidgetModuleToWidgetDictionary from "@app/Widgets/_actions/utilities/mapWidgetModuleToWidgetDictionary";
import { WidgetDictionary, WidgetDictionaryItem } from "@app/Widgets/_actions/widgetsTypes";
import { getColor, getTypography, pxToRem } from "@themes/utils";
import { FC } from "react";
import { css } from "styled-components";

import ActionItemRow from "./ActionItemRow";

type EditortemsListProps = {
    itemsDictionary: WidgetDictionary | ScenesDictionary;
    handleClickMenuItem?: <T>(menuItem: T) => void;
    handleClickRow?: <T>(row: T) => void;
    handleClickRemove?: (id: string) => void;
    isActionRowSelected?: <T>(row: T) => boolean;
};

type EditortemsListStyles = {
    button?: ButtonStylesProps;
    deleteButton?: ButtonStylesProps;
    addWidgetButton?: ButtonStylesProps;
    widgetsWrapper?: StyledWrapperProps;
    widgetButton?: ButtonStylesProps;
};

const styles: EditortemsListStyles = {
    deleteButton: {
        css: css`
            color: ${getColor("danger.main")};
        `,
    },
    addWidgetButton: {
        css: css`
            margin-top: ${pxToRem(15)};
        `,
    },
    widgetsWrapper: {
        css: css`
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(4, 1fr);
        `,
    },
    widgetButton: {
        css: css`
            min-height: ${pxToRem(105)};
            border: ${pxToRem(1)} solid ${getColor("common.border")};
            font-size: ${getTypography("size.large")};
            font-weight: ${getTypography("weight.medium")};

            &:hover {
                background-color: ${getColor("common.backgroundLight")};
            }
        `,
    },
};

const EditortemsList: FC<EditortemsListProps> = ({
    itemsDictionary,
    handleClickMenuItem,
    handleClickRow,
    handleClickRemove,
    isActionRowSelected,
}) => {
    // const { addWidget, widgetsObjects, selectWidget, selectedWidgets, removeWidget } = useWidgets();
    const { widgetsObjectModules } = useWidgetsModules();

    // TODO - work with the new typ WidgetDictionaryItem in all the useWidget process

    // const handleClickMenuItem = (widget: WidgetDictionaryItem): void => {
    //     addWidget(widget);
    // };

    // const handleClickRow = (widget: WidgetObjectsDictionaryItem) => {
    //     selectWidget([widget]);
    // };

    // const handleClickRemove = (widgetId: string) => {
    //     removeWidget(widgetId);
    // };

    return (
        <Collapse title="Objects Widgets">
            {Object.keys(itemsDictionary).length > 0
                ? Object.keys(itemsDictionary).map((id) => (
                      <ActionItemRow
                          key={id}
                          onClick={() => handleClickRow?.(itemsDictionary[id])}
                          isSelected={isActionRowSelected?.(itemsDictionary[id])}
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
                : "No object widget on the scene."}
            <Modal
                title="Widgets Objects"
                size="large"
                trigger={
                    <Button isFullWidth {...styles.addWidgetButton}>
                        Add Object Widget
                    </Button>
                }
            >
                {(state) => (
                    <>
                        <StyledWrapper {...styles.widgetsWrapper}>
                            {widgetsObjectModules.length > 0
                                ? widgetsObjectModules.map((widget, index) => {
                                      const key = `${index}-${widget.widgetDefinition.name}`;
                                      const newWidget: WidgetDictionaryItem =
                                          mapWidgetModuleToWidgetDictionary(widget);

                                      return (
                                          <Button
                                              styleType="none"
                                              key={key}
                                              onClick={() => {
                                                  if (handleClickMenuItem) {
                                                      handleClickMenuItem(newWidget);
                                                      state.hide();
                                                  }
                                              }}
                                              {...styles.widgetButton}
                                          >
                                              {widget.widgetDefinition.name}
                                          </Button>
                                      );
                                  })
                                : "No object widget available. Please, create one by code."}
                        </StyledWrapper>
                    </>
                )}
            </Modal>
        </Collapse>
    );
};

export default EditortemsList;
