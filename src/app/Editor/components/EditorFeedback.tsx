import { Card, Descriptions } from "antd";
import React, { FC } from "react";
import { css } from "styled-components";
import StyledWrapper, { StyledWrapperProps } from "../../Common/components/Html/StyledWrapper";
import useWidgets from "../state/hooks/useWidgets";
// import useEditableProxies from "../state/hooks/useEditableProxies";

interface EditorFeedbackStyles {
    wrapper?: StyledWrapperProps;
}

const styles: EditorFeedbackStyles = {
    wrapper: {
        css: css`
            margin-right: 0.5em;
            max-width: 300px;
            user-select: none;
        `,
    },
};

const EditorFeedback: FC = () => {
    const { currentWidget } = useWidgets();

    if (currentWidget) {
        return (
            <StyledWrapper {...styles.wrapper}>
                <Card size="small" title="Current Element - Widget name not supported yet">
                    <Descriptions>
                        {currentWidget.position !== undefined && (
                            <Descriptions.Item
                                label="Position"
                                labelStyle={{
                                    fontWeight: "bold",
                                }}
                                contentStyle={{
                                    flexDirection: "column",
                                }}
                            >
                                <span>
                                    <i>X:</i>
                                    {currentWidget.position[0].toFixed(3)}
                                </span>
                                <span>
                                    <i>Y:</i>
                                    {currentWidget.position[1].toFixed(3)}
                                </span>
                                <span>
                                    <i>Z:</i>
                                    {currentWidget.position[2].toFixed(3)}
                                </span>
                            </Descriptions.Item>
                        )}
                    </Descriptions>
                    <Descriptions>
                        {currentWidget.rotation !== undefined && (
                            <Descriptions.Item
                                label="Rotation"
                                labelStyle={{
                                    fontWeight: "bold",
                                }}
                                contentStyle={{
                                    flexDirection: "column",
                                }}
                            >
                                <span>
                                    <i>X:</i>
                                    {currentWidget.rotation[0].toFixed(3)}
                                </span>
                                <span>
                                    <i>Y:</i>
                                    {currentWidget.rotation[1].toFixed(3)}
                                </span>
                                <span>
                                    <i>Z:</i>
                                    {currentWidget.rotation[2].toFixed(3)}
                                </span>
                            </Descriptions.Item>
                        )}
                    </Descriptions>
                    <Descriptions>
                        {currentWidget.scale !== undefined && (
                            <Descriptions.Item
                                label="Scale"
                                labelStyle={{
                                    fontWeight: "bold",
                                }}
                                contentStyle={{
                                    flexDirection: "column",
                                }}
                            >
                                <span>
                                    <i>X:</i>
                                    {currentWidget.scale[0].toFixed(3)}
                                </span>
                                <span>
                                    <i>Y:</i>
                                    {currentWidget.scale[1].toFixed(3)}
                                </span>
                                <span>
                                    <i>Z:</i>
                                    {currentWidget.scale[2].toFixed(3)}
                                </span>
                            </Descriptions.Item>
                        )}
                    </Descriptions>
                </Card>
            </StyledWrapper>
        );
    }

    return null;
};

export default EditorFeedback;
