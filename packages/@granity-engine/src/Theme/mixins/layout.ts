import { pxToRem } from "@granity/ui";

export type LayoutOptions = {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    width?: number;
};

export const layoutStyles = (options: LayoutOptions) => {
    const { top, right, bottom, left, width } = options;

    return {
        position: "absolute",
        maxHeight: `calc(100vh - ${pxToRem(top || 0)} - ${pxToRem(bottom || 0)})`,
        width: "100%",
        maxWidth: `${width !== undefined && pxToRem(width)}`,
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
