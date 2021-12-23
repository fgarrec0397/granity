import { Button } from "antd";
import React, { FC, useContext, useEffect } from "react";
import { css } from "styled-components";
import { EditorContext } from "../../context/EditorContextProvider";
import uidGenerator from "../../utils/uidGenerator";
import StyledWrapper, { StyledWrapperProps } from "../Html/StyledWrapper";

interface EditorFeedbackStyles {
  wrapper?: StyledWrapperProps;
  buttonsStyle?: React.CSSProperties;
}

const styles: EditorFeedbackStyles = {
  wrapper: {
    css: css`
      margin-right: 0.5em;
      max-width: 300px;
      user-select: none;
    `,
  },
  buttonsStyle: {
    marginRight: "0.25em",
  },
};

const EditorGeometryMenu: FC = () => {
  const { elementsOnScene, setElementsOnScene } = useContext(EditorContext);

  const handleOnClick = (component: string): void => {
    const possiblyElementsOnScene = elementsOnScene || [];
    if (setElementsOnScene) {
      const numberOfElementsByType = possiblyElementsOnScene.filter(
        (x) => x.component === component
      ).length;
      const uid = uidGenerator();
      const name = `${component}${
        numberOfElementsByType < 10 ? "0" : null
      }${numberOfElementsByType}`;

      setElementsOnScene([
        ...possiblyElementsOnScene,
        {
          uid,
          component,
          name,
        },
      ]);
    }
  };

  return (
    <StyledWrapper {...styles.wrapper}>
      <Button
        type="dashed"
        onClick={() => handleOnClick("cube")}
        style={styles.buttonsStyle}
      >
        + Cube
      </Button>
      <Button
        type="dashed"
        onClick={() => handleOnClick("plane")}
        style={styles.buttonsStyle}
      >
        + Plane
      </Button>
    </StyledWrapper>
  );
};

export default EditorGeometryMenu;
