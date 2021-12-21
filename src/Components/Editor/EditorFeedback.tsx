import { Card, Descriptions } from "antd";
import React, { FC, useContext, useEffect } from "react";
import { css } from "styled-components";
import { EditorContext } from "../../context/EditorContextProvider";
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
  const { currentElementInformations } = useContext(EditorContext);

  useEffect(() => {
    console.log(
      currentElementInformations,
      "currentElementInformations from feedback"
    );
  }, [currentElementInformations]);

  if (currentElementInformations) {
    return (
      <StyledWrapper {...styles.wrapper}>
        <Card
          size="small"
          title={`Current Element - ${currentElementInformations.name}`}
        >
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
                <i>X:</i> {currentElementInformations.position[0].toFixed(3)}
              </span>
              <span>
                <i>Y:</i> {currentElementInformations.position[1].toFixed(3)}
              </span>
              <span>
                <i>Z:</i> {currentElementInformations.position[2].toFixed(3)}
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
                <i>X:</i> {currentElementInformations.rotation[0].toFixed(3)}
              </span>
              <span>
                <i>Y:</i> {currentElementInformations.rotation[1].toFixed(3)}
              </span>
              <span>
                <i>Z:</i> {currentElementInformations.rotation[2].toFixed(3)}
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
                <i>X:</i> {currentElementInformations.scale[0].toFixed(3)}
              </span>
              <span>
                <i>Y:</i> {currentElementInformations.scale[1].toFixed(3)}
              </span>
              <span>
                <i>Z:</i> {currentElementInformations.scale[2].toFixed(3)}
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
