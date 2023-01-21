import { css } from "styled-components";

import { getCommon, pxToRem } from "../utils";
import { actionStyles } from "./common";

export const baseButtonStyles = (isFullWidth = false) => {
    return css`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: ${pxToRem(6, 20)};
        width: ${isFullWidth ? "100%" : "auto"};
        text-align: center;
        border-radius: ${getCommon("borderRadius.button")};

        ${actionStyles()}
    `;
};