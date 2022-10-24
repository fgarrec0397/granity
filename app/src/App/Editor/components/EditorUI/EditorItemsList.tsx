import { StyledWrapper } from "@app/Common/components/Html";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { WidgetObjectsDictionaryItem } from "@app/Widgets/_actions/widgetsTypes";
import { Button, Card, List } from "antd";
import { FC } from "react";
import { css } from "styled-components";

const EditorItemsList: FC = () => {
    const { widgetsObjects, selectWidget, selectedWidgets } = useWidgets();

    const handleSelect = (widget: WidgetObjectsDictionaryItem) => {
        selectWidget([widget]);
    };

    return (
        <StyledWrapper
            css={css`
                width: 100%;
                margin-bottom: 1em;
            `}
        >
            <Card size="small" title="Elements on scene">
                <List
                    size="small"
                    bordered
                    dataSource={Object.keys(widgetsObjects)}
                    renderItem={(widgetId) => (
                        <List.Item>
                            <Button
                                onClick={() => handleSelect(widgetsObjects[widgetId])}
                                disabled={widgetsObjects[widgetId]?.id === selectedWidgets[0]?.id}
                            >
                                {widgetsObjects[widgetId].widgetDefinition.name}
                            </Button>
                        </List.Item>
                    )}
                />
            </Card>
        </StyledWrapper>
    );
};

export default EditorItemsList;
