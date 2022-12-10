import { getCommon, pxToRem } from "@themes/utils";
import { css } from "styled-components";

import { actionStyles } from "./common";

export const baseButtonStyles = (isFullWidth = false) => {
    return css`
        padding: ${pxToRem(6, 20)};
        width: ${isFullWidth ? "100%" : "auto"};
        text-align: center;
        border-radius: ${getCommon("borderRadius.button")};

        ${actionStyles()}
    `;
};
