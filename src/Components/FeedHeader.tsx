import React, { FC } from "react";
import { css } from "styled-components";
import Stars from "../Icons/Stars";
import StyledWrapper, { StyledWrapperProps } from "./StyledWrapper";
import Typography, { TypographyStyles } from "./Typography";

interface FeedHeaderStyles {
  wrapper?: StyledWrapperProps;
  text?: TypographyStyles;
  iconWrapper?: StyledWrapperProps;
}

const styles: FeedHeaderStyles = {
  wrapper: {
    css: css`
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
  },
  text: {
    css: css`
      font-weight: bold;
    `,
  },
  iconWrapper: {
    css: css`
      padding: 10px;
      display: flex;
      align-items: center;
      border-radius: 100%;
      cursor: pointer;

      &:hover {
        background-color: #e9e9e9;
      }
    `,
  },
};

const FeedHeader: FC = () => {
  return (
    <StyledWrapper {...styles.wrapper}>
      <Typography {...styles.text}>Home</Typography>
      <StyledWrapper {...styles.iconWrapper}>
        <Stars />
      </StyledWrapper>
    </StyledWrapper>
  );
};

export default FeedHeader;
