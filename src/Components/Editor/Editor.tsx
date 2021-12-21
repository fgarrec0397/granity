import React, { FC, useContext } from "react";
import { css } from "styled-components";
import { EditorContext } from "../../context/EditorContextProvider";
import StyledWrapper, { StyledWrapperProps } from "../Html/StyledWrapper";
import EditorFeedback from "./EditorFeedback";
import EditorModeSelector from "./EditorModeSelector";

interface EditorStyles {
  wrapper?: StyledWrapperProps;
}

const styles: EditorStyles = {
  wrapper: {
    css: css`
      position: absolute;
      top: 1em;
      left: 1em;
      display: flex;
      align-items: flex-start;
      user-select: none;
    `,
  },
};

const Editor: FC = () => {
  const { isEditor } = useContext(EditorContext);

  if (isEditor) {
    return (
      <StyledWrapper {...styles.wrapper}>
        <EditorFeedback />
        <EditorModeSelector />
      </StyledWrapper>
    );
  }
  return null;
};

export default Editor;
