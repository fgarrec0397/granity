import { Card, Descriptions } from "antd";
import React, { FC } from "react";
import { css } from "styled-components";
import StyledWrapper, { StyledWrapperProps } from "../../../common/components/Html/StyledWrapper";
import useCurrentElement from "../state/hooks/useCurrentElement";

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
    const { currentElement } = useCurrentElement();

    if (currentElement) {
        return (
            <StyledWrapper {...styles.wrapper}>
                <Card size="small" title={`Current Element - ${currentElement.name}`}>
                    <Descriptions>
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
                                {currentElement.position.x.toFixed(3)}
                            </span>
                            <span>
                                <i>Y:</i>
                                {currentElement.position.y.toFixed(3)}
                            </span>
                            <span>
                                <i>Z:</i>
                                {currentElement.position.z.toFixed(3)}
                            </span>
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions>
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
                                {currentElement.rotation.x.toFixed(3)}
                            </span>
                            <span>
                                <i>Y:</i>
                                {currentElement.rotation.y.toFixed(3)}
                            </span>
                            <span>
                                <i>Z:</i>
                                {currentElement.rotation.z.toFixed(3)}
                            </span>
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions>
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
                                {currentElement.scale.x.toFixed(3)}
                            </span>
                            <span>
                                <i>Y:</i>
                                {currentElement.scale.y.toFixed(3)}
                            </span>
                            <span>
                                <i>Z:</i>
                                {currentElement.scale.z.toFixed(3)}
                            </span>
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </StyledWrapper>
        );
    }

    return null;
};

export default EditorFeedback;
