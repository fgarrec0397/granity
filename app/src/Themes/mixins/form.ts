import { getColor, getCommon, getTypography, pxToRem } from "@themes/utils";
import getFocus from "@themes/utils/getFocus";
import { css } from "styled-components";

import { focusStyles } from "./common";

export const labelStyles = () => {
    return css`
        margin-bottom: ${pxToRem(10)};
        font-size: ${getTypography("size.tiny")};
        font-weight: ${getTypography("weight.bold")};
    `;
};

export const inputStyles = () => {
    return css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background-color: ${getColor("common.backgroundLight")};
        border: ${getFocus("borderWidth")} solid ${getColor("common.backgroundLight")};
        border-radius: ${getCommon("borderRadius.formField")};

        /* Chrome, Safari, Edge, Opera */
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        /* Firefox */
        &[type="number"] {
            -moz-appearance: textfield;
        }

        ${focusStyles()}
    `;
};
