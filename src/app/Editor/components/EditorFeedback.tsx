import { Card, Descriptions } from "antd";
import React, { FC } from "react";
import { css } from "styled-components";
import StyledWrapper, { StyledWrapperProps } from "../../Common/components/Html/StyledWrapper";
import useWidgets from "../../Widgets/state/hooks/useWidgets";

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
    const { currentWidgets } = useWidgets();

    if (currentWidgets.length) {
        return (
            <StyledWrapper {...styles.wrapper}>
                <Card size="small" title="Current Element - Widget name not supported yet">
                    <Descriptions>
                        {currentWidgets[0].properties.position !== undefined && (
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
                                    {currentWidgets[0].properties.position[0].toFixed(3)}
                                </span>
                                <span>
                                    <i>Y:</i>
                                    {currentWidgets[0].properties.position[1].toFixed(3)}
                                </span>
                                <span>
                                    <i>Z:</i>
                                    {currentWidgets[0].properties.position[2].toFixed(3)}
                                </span>
                            </Descriptions.Item>
                        )}
                    </Descriptions>
                    <Descriptions>
                        {currentWidgets[0].properties.rotation !== undefined && (
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
                                    {currentWidgets[0].properties.rotation[0].toFixed(3)}
                                </span>
                                <span>
                                    <i>Y:</i>
                                    {currentWidgets[0].properties.rotation[1].toFixed(3)}
                                </span>
                                <span>
                                    <i>Z:</i>
                                    {currentWidgets[0].properties.rotation[2].toFixed(3)}
                                </span>
                            </Descriptions.Item>
                        )}
                    </Descriptions>
                    <Descriptions>
                        {currentWidgets[0].properties.scale !== undefined && (
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
                                    {currentWidgets[0].properties.scale[0].toFixed(3)}
                                </span>
                                <span>
                                    <i>Y:</i>
                                    {currentWidgets[0].properties.scale[1].toFixed(3)}
                                </span>
                                <span>
                                    <i>Z:</i>
                                    {currentWidgets[0].properties.scale[2].toFixed(3)}
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
