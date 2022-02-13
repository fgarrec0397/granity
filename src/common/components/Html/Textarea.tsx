import { Input } from "antd";
import React, { FC } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

const { TextArea } = Input;

export interface TextareaStyles {
  css?: FlattenSimpleInterpolation;
}

type Props = TextareaStyles;

const StyledTextArea = styled(TextArea)<TextareaStyles>`
  overflow: hidden;

  ${(props) => props.css}
`;

const TextAreaComponent: FC<Props> = () => {
  return (
    <StyledTextArea
      size="large"
      autoSize
      bordered={false}
      placeholder="What's happening?"
    />
  );
};

export default TextAreaComponent;
