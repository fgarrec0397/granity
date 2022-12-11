import { StyledWrapper, Typography } from "@app/Common/components/Html";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { Button, Card, List } from "antd";
import { FC } from "react";
import { css } from "styled-components";

const EditorItemsList: FC = () => {
    const { widgetsUI, removeWidget } = useWidgets();

    const handleRemove = (widgetId: string) => {
        removeWidget(widgetId);
    };

    return (
        <StyledWrapper
            css={css`
                width: 100%;
                margin-bottom: 1em;
            `}
        >
            <Card size="small" title="UI for this scene">
                <List
                    size="small"
                    bordered
                    dataSource={Object.keys(widgetsUI)}
                    renderItem={(widgetId) => (
                        <List.Item>
                            <Typography>{widgetsUI[widgetId].widgetDefinition.name}</Typography>
                            <Button onClick={() => handleRemove(widgetId)}>X</Button>
                        </List.Item>
                    )}
                />
            </Card>
        </StyledWrapper>
    );
};

export default EditorItemsList;
