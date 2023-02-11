import { pxToRem } from "@granity/ui";

export type LayoutOptions = {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    width?: number;
    autoWidth?: boolean;
    centered?: boolean;
};

export const layoutStyles = (options: LayoutOptions) => {
    const { top, right, bottom, left, width, autoWidth, centered } = options;

    return {
        position: "absolute",
        maxHeight: `calc(100vh - ${pxToRem(top || 0)} - ${pxToRem(bottom || 0)})`,
        width: `${autoWidth ? "auto" : "100%"}`,
        maxWidth: `${width !== undefined ? pxToRem(width) : "none"}`,
        top: `${top !== undefined ? pxToRem(top) : "unset"}`,
        bottom: `${bottom !== undefined ? pxToRem(bottom) : "unset"}`,
        userSelect: "none",
        ...(!autoWidth
            ? {
                  right: `${right !== undefined ? pxToRem(right) : "unset"}`,
                  left: `${left !== undefined ? pxToRem(left) : "unset"}`,
              }
            : {}),
        ...(centered
            ? {
                  left: "50%",
                  transform: "translateX(-50%)",
              }
            : {}),
    };
};

export const layoutSectionStyles = () => {
    return {
        width: "100%",
        maxWidth: pxToRem(300),
        userSelect: "none",
    };
};
