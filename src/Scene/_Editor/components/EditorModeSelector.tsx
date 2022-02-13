import { Card, Select } from "antd";
import React, { FC } from "react";
import { css } from "styled-components";
import StyledWrapper, {
  StyledWrapperProps,
} from "../../../common/components/Html/StyledWrapper";
import useCurrentMode from "../state/hooks/useCurrentMode";
import { ModesAvailable } from "../state/types";

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
  const { setCurrentMode } = useCurrentMode();

  const handleChange = (value: ModesAvailable): void => {
    setCurrentMode(value);
  };

  return (
    <StyledWrapper {...styles.wrapper}>
      <Card size="small" title="Mode" style={{ width: 300 }}>
        <Select
          defaultValue={ModesAvailable.Translate}
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
