import { StyledWrapper } from "@app/Common/components/Html";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { Card, List } from "antd";
import { FC } from "react";
import { css } from "styled-components";

const EditorItemsList: FC = () => {
    const { widgetsUI } = useWidgets();

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
                        <List.Item>{widgetsUI[widgetId].widgetDefinition.name}</List.Item>
                    )}
                />
            </Card>
        </StyledWrapper>
    );
};

export default EditorItemsList;
