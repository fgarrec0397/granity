import { Button } from "antd";
import React, { FC } from "react";
import { css } from "styled-components";
import StyledWrapper, {
  StyledWrapperProps,
} from "../../../common/components/Html/StyledWrapper";
import uidGenerator from "../../../common/utils/uidGenerator";
import useElementsOnScene from "../state/hooks/useElementsOnScene";

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
  const { elementsOnScene, setElementsOnScene } = useElementsOnScene();

  const handleOnClick = (component: string): void => {
    const possiblyElementsOnScene = elementsOnScene || [];

    const numberOfElementsByType = possiblyElementsOnScene.filter(
      (x) => x.component === component
    ).length;
    const id = uidGenerator();
    const name = `${component}${
      numberOfElementsByType < 10 ? "0" : null
    }${numberOfElementsByType}`;
    // TODO - Be able to pass default position

    setElementsOnScene({
      id,
      component,
      name,
    });
  };

  /** Will be used when light will be implemented */
  // const menu = (
  //   <Menu>
  //     {lightTypes.map((lightType) => (
  //       <Menu.Item
  //         key={lightType}
  //         onClick={() => handleOnClick("light", lightType)}
  //       >
  //         {lightType}
  //       </Menu.Item>
  //     ))}
  //   </Menu>
  // );

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
      {/* 
      /** Will be used when light will be implemented
      <Dropdown overlay={menu} placement="topLeft">
        <Button type="dashed" style={styles.buttonsStyle}>
          + Light
        </Button>
      </Dropdown> */}
    </StyledWrapper>
  );
};

export default EditorGeometryMenu;
