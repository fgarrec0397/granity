import React, { FC } from "react";
import { css } from "styled-components";
import StyledWrapper, { StyledWrapperProps } from "./Html/StyledWrapper";

export interface LoaderStyles {
  wrapper?: StyledWrapperProps;
  svgWrapper?: StyledWrapperProps;
}

const styles: LoaderStyles = {
  wrapper: {
    css: css`
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
  },
  svgWrapper: {
    css: css`
      width: 40px;
      height: 40px;
      animation-name: infiniteRotation;
      animation-duration: 0.75s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;

      @keyframes infiniteRotation {
        from {
          transform: rotateZ(0deg);
        }
        to {
          transform: rotateZ(360deg);
        }
      }
    `,
  },
};

const Loader: FC = () => {
  return (
    <StyledWrapper {...styles.wrapper}>
      <StyledWrapper {...styles.svgWrapper}>
        <svg height="100%" viewBox="0 0 32 32" width="100%">
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{ stroke: "rgb(204, 0, 0)", opacity: "0.2" }}
          />
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{
              stroke: "rgb(204, 0, 0)",
              strokeDasharray: "80",
              strokeDashoffset: "60",
            }}
          />
        </svg>
      </StyledWrapper>
    </StyledWrapper>
  );
};

export default Loader;
