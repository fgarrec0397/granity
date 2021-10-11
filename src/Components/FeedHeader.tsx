import React, { FC } from "react";
import { css } from "styled-components";
import Stars from "../Icons/Stars";
import Box from "./Box";
import StyledWrapper, { StyledWrapperProps } from "./StyledWrapper";
import Typography, { TypographyStyles } from "./Typography";

interface FeedHeaderStyles {
  wrapper?: StyledWrapperProps;
  text?: TypographyStyles;
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
};

const FeedHeader: FC = () => {
  return (
    <StyledWrapper {...styles.wrapper}>
      <Typography {...styles.text}>Home</Typography>
      <Stars />
    </StyledWrapper>
  );
};

export default FeedHeader;
