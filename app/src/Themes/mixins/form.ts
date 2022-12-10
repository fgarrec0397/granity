import { getColor, getCommon, getTypography, pxToRem } from "@themes/utils";
import getFocus from "@themes/utils/getFocus";
import { css } from "styled-components";

export const labelStyles = () => {
    return css`
        margin-bottom: ${pxToRem(10)};
        font-size: ${getTypography("size.tiny")};
        font-size: ${getTypography("weight.bold")};
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

        &:focus,
        &:focus-visible,
        &[data-focus-visible] {
            outline: ${getFocus("main.borderWidth")} solid ${getFocus("main.borderColor")};
        }
    `;
};
