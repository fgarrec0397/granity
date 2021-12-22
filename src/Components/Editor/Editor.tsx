import React, { FC, useContext } from "react";
import { css } from "styled-components";
import { EditorContext } from "../../context/EditorContextProvider";
import StyledWrapper, { StyledWrapperProps } from "../Html/StyledWrapper";
import EditorFeedback from "./EditorFeedback";
import EditorGeometryMenu from "./EditorGeometryMenu";
import EditorModeSelector from "./EditorModeSelector";

interface EditorStyles {
  topWrapper?: StyledWrapperProps;
  bottomWrapper?: StyledWrapperProps;
}

const styles: EditorStyles = {
  topWrapper: {
    css: css`
      position: absolute;
      top: 1em;
      left: 1em;
      display: flex;
      align-items: flex-start;
      user-select: none;
    `,
  },
  bottomWrapper: {
    css: css`
      position: absolute;
      bottom: 1em;
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
      <>
        <StyledWrapper {...styles.topWrapper}>
          <EditorFeedback />
          <EditorModeSelector />
        </StyledWrapper>
        <StyledWrapper {...styles.bottomWrapper}>
          <EditorGeometryMenu />
        </StyledWrapper>
      </>
    );
  }
  return null;
};

export default Editor;
