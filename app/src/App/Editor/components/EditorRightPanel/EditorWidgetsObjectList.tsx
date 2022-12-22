import { StyledWrapper, StyledWrapperProps } from "@app/Common/components/Html";
import Button, { ButtonStylesProps } from "@app/Common/components/Html/Button/Button";
import Collapse from "@app/Common/components/Html/Collapse/Collapse";
import Garbage from "@app/Common/components/Html/Icons/Garbage";
import Modal from "@app/Common/components/Html/Modal/Modal";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import useWidgetsModules from "@app/Widgets/_actions/hooks/useWidgetsModules";
import mapWidgetModuleToWidgetDictionary from "@app/Widgets/_actions/utilities/mapWidgetModuleToWidgetDictionary";
import {
    WidgetDictionaryItem,
    WidgetObjectsDictionaryItem,
} from "@app/Widgets/_actions/widgetsTypes";
import { getColor, pxToRem } from "@themes/utils";
import { FC } from "react";
import { css } from "styled-components";

import ActionItemRow from "./ActionItemRow";

type EditorWidgetsObjectListStyles = {
    button?: ButtonStylesProps;
    deleteButton?: ButtonStylesProps;
    addWidgetButton?: ButtonStylesProps;
    widgetsWrapper?: StyledWrapperProps;
};

const styles: EditorWidgetsObjectListStyles = {
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
            /* display: grid;
            grid-template-columns: auto auto auto auto;
            column-gap: 50px;
            row-gap: 20px; */
        `,
    },
};

const EditorWidgetsObjectList: FC = () => {
    const { addWidget, widgetsObjects, selectWidget, selectedWidgets, removeWidget } = useWidgets();
    const { widgetsObjectModules } = useWidgetsModules();

    // TODO - work with the new typ WidgetDictionaryItem in all the useWidget process

    const handleWidgetClick = (widget: WidgetDictionaryItem): void => {
        addWidget(widget);
    };

    const handleSelect = (widget: WidgetObjectsDictionaryItem) => {
        selectWidget([widget]);
    };

    const handleRemove = (widgetId: string) => {
        removeWidget(widgetId);
    };

    return (
        <Collapse title="Widgets Collection">
            {Object.keys(widgetsObjects).map((widgetId) => (
                <ActionItemRow
                    key={widgetId}
                    onClick={() => handleSelect(widgetsObjects[widgetId])}
                    isSelected={widgetsObjects[widgetId]?.id === selectedWidgets[0]?.id}
                >
                    {widgetsObjects[widgetId].widgetDefinition.name}
                    <Button
                        styleType="none"
                        onClick={() => handleRemove(widgetId)}
                        {...styles.deleteButton}
                    >
                        <Garbage />
                    </Button>
                </ActionItemRow>
            ))}
            <Modal
                title="Widgets"
                size="large"
                trigger={
                    <Button isFullWidth {...styles.addWidgetButton}>
                        Add Widget
                    </Button>
                }
            >
                {(state) => (
                    <>
                        <StyledWrapper {...styles.widgetsWrapper}>
                            {widgetsObjectModules.map((widget, index) => {
                                const key = `${index}-${widget.widgetDefinition.name}`;
                                const newWidget: WidgetDictionaryItem =
                                    mapWidgetModuleToWidgetDictionary(widget);

                                return (
                                    <Button
                                        styleType="none"
                                        key={key}
                                        onClick={() => {
                                            handleWidgetClick(newWidget);
                                            state.hide();
                                        }}
                                    >
                                        {widget.widgetDefinition.name}
                                    </Button>
                                );
                            })}
                        </StyledWrapper>
                        <Button {...styles.addWidgetButton} onClick={state.hide}>
                            Close
                        </Button>
                    </>
                )}
            </Modal>
        </Collapse>
    );
};

export default EditorWidgetsObjectList;
