import { Button, Dropdown, Menu } from "antd";
import React, { FC } from "react";
import { css } from "styled-components";
import useEditorContext from "../../hooks/Editor/useEditorContext";
import uidGenerator from "../../utils/uidGenerator";
import StyledWrapper, { StyledWrapperProps } from "../Html/StyledWrapper";

interface EditorFeedbackStyles {
  wrapper?: StyledWrapperProps;
  buttonsStyle?: React.CSSProperties;
}

const lightTypes = ["directionalLight", "spotLight", "pointLight"];

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
  const { elementsOnScene, setElementsOnScene } = useEditorContext();

  const handleOnClick = (component: string, ...args: string[]): void => {
    const possiblyElementsOnScene = elementsOnScene || [];

    if (setElementsOnScene) {
      const numberOfElementsByType = possiblyElementsOnScene.filter(
        (x) => x.component === component
      ).length;
      const id = uidGenerator();
      const name = `${component}${
        numberOfElementsByType < 10 ? "0" : null
      }${numberOfElementsByType}`;

      setElementsOnScene([
        ...possiblyElementsOnScene,
        {
          id,
          component,
          name,
        },
      ]);
    }
  };

  const menu = (
    <Menu>
      {lightTypes.map((lightType) => (
        <Menu.Item
          key={lightType}
          onClick={() => handleOnClick("light", lightType)}
        >
          {lightType}
        </Menu.Item>
      ))}
    </Menu>
  );

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
      <Dropdown overlay={menu} placement="topLeft">
        <Button type="dashed" style={styles.buttonsStyle}>
          + Light
        </Button>
      </Dropdown>
    </StyledWrapper>
  );
};

export default EditorGeometryMenu;
