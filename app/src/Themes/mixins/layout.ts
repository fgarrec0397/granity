import { pxToRem } from "@themes/utils";
import { css } from "styled-components";

export const layoutStyles = (top?: number, right?: number, bottom?: number, left?: number) => {
    return css`
        position: absolute;
        ${top !== undefined &&
        css`
            top: ${pxToRem(top)};
        `}
        ${right !== undefined &&
        css`
            right: ${pxToRem(right)};
        `}
        ${bottom !== undefined &&
        css`
            bottom: ${pxToRem(bottom)};
        `}
        ${left !== undefined &&
        css`
            left: ${pxToRem(left)};
        `}
        user-select: none;
    `;
};
