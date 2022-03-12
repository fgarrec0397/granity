import { Card, Descriptions } from "antd";
import React, { FC } from "react";
import { css } from "styled-components";
import StyledWrapper, { StyledWrapperProps } from "../../Common/components/Html/StyledWrapper";
import useEditableProxies from "../state/hooks/useEditableProxies";

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
    const { currentProxy } = useEditableProxies();

    if (currentProxy) {
        return (
            <StyledWrapper {...styles.wrapper}>
                <Card size="small" title={`Current Element - ${currentProxy.name}`}>
                    <Descriptions>
                        {currentProxy.position !== undefined && (
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
                                    {currentProxy.position[0].toFixed(3)}
                                </span>
                                <span>
                                    <i>Y:</i>
                                    {currentProxy.position[1].toFixed(3)}
                                </span>
                                <span>
                                    <i>Z:</i>
                                    {currentProxy.position[2].toFixed(3)}
                                </span>
                            </Descriptions.Item>
                        )}
                    </Descriptions>
                    <Descriptions>
                        {currentProxy.rotation !== undefined && (
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
                                    {currentProxy.rotation[0].toFixed(3)}
                                </span>
                                <span>
                                    <i>Y:</i>
                                    {currentProxy.rotation[1].toFixed(3)}
                                </span>
                                <span>
                                    <i>Z:</i>
                                    {currentProxy.rotation[2].toFixed(3)}
                                </span>
                            </Descriptions.Item>
                        )}
                    </Descriptions>
                    <Descriptions>
                        {currentProxy.scale !== undefined && (
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
                                    {currentProxy.scale[0].toFixed(3)}
                                </span>
                                <span>
                                    <i>Y:</i>
                                    {currentProxy.scale[1].toFixed(3)}
                                </span>
                                <span>
                                    <i>Z:</i>
                                    {currentProxy.scale[2].toFixed(3)}
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
