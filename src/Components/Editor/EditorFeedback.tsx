import { Card, Descriptions } from "antd";
import React, { FC } from "react";
import { css } from "styled-components";
import useEditorContext from "../../hooks/Editor/useEditorContext";
import StyledWrapper, { StyledWrapperProps } from "../Html/StyledWrapper";

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
  const { currentElement } = useEditorContext();

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
                <i>X:</i> {currentElement.position[0].toFixed(3)}
              </span>
              <span>
                <i>Y:</i> {currentElement.position[1].toFixed(3)}
              </span>
              <span>
                <i>Z:</i> {currentElement.position[2].toFixed(3)}
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
                <i>X:</i> {currentElement.rotation[0].toFixed(3)}
              </span>
              <span>
                <i>Y:</i> {currentElement.rotation[1].toFixed(3)}
              </span>
              <span>
                <i>Z:</i> {currentElement.rotation[2].toFixed(3)}
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
                <i>X:</i> {currentElement.scale[0].toFixed(3)}
              </span>
              <span>
                <i>Y:</i> {currentElement.scale[1].toFixed(3)}
              </span>
              <span>
                <i>Z:</i> {currentElement.scale[2].toFixed(3)}
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
