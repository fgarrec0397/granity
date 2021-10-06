import { Vector3 } from "@react-three/fiber";
import { Button } from "antd";
import React, { FC } from "react";
import { css } from "styled-components";
import TwitterLogo from "../Icons/TwitterLogo";
import Box from "./Box";
import StyledWrapper from "./StyledWrapper";

interface Props {
  scale: Vector3;
}

interface SideMenuStyles {
  logoColor?: string;
}

const styles: SideMenuStyles = {
  // logoColor:
};

const SideMenu: FC<Props> = ({ scale }) => {
  return (
    <Box position={[-1.1, 0, 0]} scale={scale} text="1 Hello motha fuck***">
      <div
        style={{
          height: "665px",
          width: "265px",
        }}
      >
        <StyledWrapper
          css={css`
            width: 28px;
          `}
        >
          <TwitterLogo />
        </StyledWrapper>
      </div>
    </Box>
  );
};

export default SideMenu;
