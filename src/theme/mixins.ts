import { css, FlattenSimpleInterpolation } from "styled-components";
import baseTheme from "./baseTheme";

export const dotBeforeStyles = (): FlattenSimpleInterpolation => {
  return css`
    display: flex;
    align-items: center;
    &::before {
      content: "";
      display: block;
      margin: 0 5px;
      width: 4px;
      height: 4px;
      background-color: ${baseTheme.colors.text.light};
      border-radius: 100%;
    }
  `;
};
