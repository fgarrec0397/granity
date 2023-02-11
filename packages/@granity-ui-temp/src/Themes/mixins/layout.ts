import { css } from "styled-components";

import { pxToRem } from "../utils";
import { scrollableStyles } from "./scrollbar";

export type LayoutPosition = {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
};

export const layoutStyles = (position: LayoutPosition, isScrollable = true) => {
    const { top, right, bottom, left } = position;

    return css`
        position: absolute;
        max-height: calc(100vh - ${pxToRem(top || 0)} - ${pxToRem(bottom || 0)});
        ${isScrollable && scrollableStyles()}

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
