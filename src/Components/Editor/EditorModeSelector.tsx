import { Card, Select } from "antd";
import React, { FC, useContext } from "react";
import { css } from "styled-components";
import {
  EditorContext,
  ModesAvailable,
} from "../../context/EditorContextProvider";
import StyledWrapper, { StyledWrapperProps } from "../Html/StyledWrapper";

const { Option } = Select;

interface EditorFeedbackStyles {
  wrapper?: StyledWrapperProps;
}

const styles: EditorFeedbackStyles = {
  wrapper: {
    css: css`
      max-width: 300px;
      margin-right: 0.5em;
      user-select: none;
    `,
  },
};

const EditorModeSelector: FC = () => {
  const { setCurrentMode } = useContext(EditorContext);

  const handleChange = (value: ModesAvailable): void => {
    if (setCurrentMode) setCurrentMode(value);
  };

  return (
    <StyledWrapper {...styles.wrapper}>
      <Card size="small" title="Mode" style={{ width: 300 }}>
        <Select
          defaultValue="translate"
          style={{ width: 120 }}
          onChange={handleChange}
        >
          <Option value="translate">Translate</Option>
          <Option value="rotate">Rotate</Option>
          <Option value="scale">Scale</Option>
        </Select>
      </Card>
    </StyledWrapper>
  );
};

export default EditorModeSelector;
