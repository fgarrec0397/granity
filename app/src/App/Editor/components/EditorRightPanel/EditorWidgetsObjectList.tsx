import Button, { ButtonStylesProps } from "@app/Common/components/Html/Button/Button";
import Collapse from "@app/Common/components/Html/Collapse/Collapse";
import Garbage from "@app/Common/components/Html/Icons/Garbage";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import useWidgetsModules from "@app/Widgets/_actions/hooks/useWidgetsModules";
import {
    WidgetDictionaryItem,
    WidgetObjectsDictionaryItem,
} from "@app/Widgets/_actions/widgetsTypes";
import { getColor, pxToRem } from "@themes/utils";
import { FC, useState } from "react";
import { css } from "styled-components";

import ActionItemRow from "./ActionItemRow";

type EditorWidgetsObjectListStyles = {
    button?: ButtonStylesProps;
    deleteButton?: ButtonStylesProps;
    addWidgetButton?: ButtonStylesProps;
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
};

const EditorWidgetsObjectList: FC = () => {
    const { addWidget, widgetsObjects, selectWidget, selectedWidgets, removeWidget } = useWidgets();
    const { widgetsObjectModules, widgetsUIModules } = useWidgetsModules();
    const [isModalVisible, setIsModalVisible] = useState(false);

    // TODO - work with the new typ WidgetDictionaryItem in all the useWidget process

    const handleWidgetClick = (widget: WidgetDictionaryItem): void => {
        addWidget(widget);
        closeModalHandler();
    };

    const openModalHandler = () => {
        setIsModalVisible(true);
    };

    const closeModalHandler = () => {
        setIsModalVisible(false);
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
            <Button isFullWidth {...styles.addWidgetButton} onClick={openModalHandler}>
                Add Widget
            </Button>
        </Collapse>
    );
};

export default EditorWidgetsObjectList;
