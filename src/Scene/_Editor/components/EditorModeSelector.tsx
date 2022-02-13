import { Card, Select } from "antd";
import React, { FC } from "react";
import { css } from "styled-components";
import StyledWrapper, {
  StyledWrapperProps,
} from "../../../common/components/Html/StyledWrapper";
import { ModesAvailable } from "../state/EditorContextProvider";
import useEditorContext from "../state/hooks/useEditorContext";

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
  const { setCurrentMode } = useEditorContext();

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
