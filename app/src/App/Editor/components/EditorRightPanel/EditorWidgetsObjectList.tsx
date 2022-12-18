import { StyledWrapper, StyledWrapperProps } from "@app/Common/components/Html";
import Button, { ButtonStylesProps } from "@app/Common/components/Html/Button/Button";
import Collapse from "@app/Common/components/Html/Collapse/Collapse";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { WidgetObjectsDictionaryItem } from "@app/Widgets/_actions/widgetsTypes";
import { pxToRem } from "@themes/utils";
import { FC } from "react";
import { css } from "styled-components";

type EditorWidgetsObjectListStyles = {
    row?: StyledWrapperProps;
    button?: ButtonStylesProps;
};

const styles: EditorWidgetsObjectListStyles = {
    row: {
        css: css`
            display: flex;
            align-items: center;
            padding-top: ${pxToRem(10)};

            &:last-child {
                padding-bottom: ${pxToRem(10)};
            }
        `,
    },
};

const EditorWidgetsObjectList: FC = () => {
    const { widgetsObjects, selectWidget, selectedWidgets, removeWidget } = useWidgets();

    const handleSelect = (widget: WidgetObjectsDictionaryItem) => {
        selectWidget([widget]);
    };

    const handleRemove = (widgetId: string) => {
        removeWidget(widgetId);
    };

    return (
        <Collapse title="Widgets Collection">
            {Object.keys(widgetsObjects).map((widgetId) => (
                <StyledWrapper key={widgetId} {...styles.row}>
                    <Button
                        styleType="none"
                        onClick={() => handleSelect(widgetsObjects[widgetId])}
                        disabled={widgetsObjects[widgetId]?.id === selectedWidgets[0]?.id}
                    >
                        {widgetsObjects[widgetId].widgetDefinition.name}
                    </Button>
                    <Button styleType="none" onClick={() => handleRemove(widgetId)}>
                        X
                    </Button>
                </StyledWrapper>
            ))}
        </Collapse>
    );
};

export default EditorWidgetsObjectList;
