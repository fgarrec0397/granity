import { pxToRem } from "@granity/ui";

export type LayoutPosition = {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
};

export const layoutStyles = (position: LayoutPosition, isScrollable = true) => {
    const { top, right, bottom, left } = position;

    return {
        position: "absolute",
        maxHeight: `calc(100vh - ${pxToRem(top || 0)} - ${pxToRem(bottom || 0)})`,
        top: `${top !== undefined && pxToRem(top)}`,
        right: `${right !== undefined && pxToRem(right)}`,
        bottom: `${bottom !== undefined && pxToRem(bottom)}`,
        left: `${left !== undefined && pxToRem(left)}`,
        userSelect: "none",
    };
};

export const layoutSectionStyles = () => {
    return {
        width: "100%",
        maxWidth: pxToRem(300),
        userSelect: "none",
    };
};
