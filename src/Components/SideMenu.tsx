import { Vector3 } from "@react-three/fiber";
import { Button } from "antd";
import React, { FC } from "react";
import { css, FlattenSimpleInterpolation } from "styled-components";
import Link from "./Link";
import TwitterLogo from "../Icons/TwitterLogo";
import Box from "./Box";
import StyledWrapper, { StyledWrapperProps } from "./StyledWrapper";

interface Props {
  scale: Vector3;
}

interface SideMenuStyles {
  linksWrapper?: StyledWrapperProps;
}

const styles: SideMenuStyles = {
  linksWrapper: {
    css: css`
      display: flex;
      flex-direction: column;
    `,
  },
};

const SideMenu: FC<Props> = ({ scale }) => {
  return (
    <Box position={[-1, 0, 0]} scale={scale} text="1 Hello motha fuck***">
      <div
        style={{
          height: "665px",
          width: "200px",
          padding: "1em",
        }}
      >
        <StyledWrapper
          css={css`
            width: 28px;
          `}
        >
          <TwitterLogo />
        </StyledWrapper>
        <StyledWrapper as="nav" {...styles.linksWrapper}>
          <Link to="/">Home </Link>
          <Link to="/">Explore </Link>
          <Link to="/">Notifications </Link>
          <Link to="/">Messages </Link>
          <Link to="/">Bookmarks </Link>
          <Link to="/">Lists </Link>
          <Link to="/">Profile </Link>
          <Link to="/">More </Link>
        </StyledWrapper>
      </div>
    </Box>
  );
};

export default SideMenu;
