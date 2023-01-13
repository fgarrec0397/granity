import { getCommon, pxToRem } from "../utils";
import { css } from "styled-components";

export type ScrollSide = "y" | "x";

export const scrollableStyles = (side: ScrollSide = "y") => {
    return css`
        padding-right: ${pxToRem(10)};
        margin-right: -${pxToRem(10)};
        overflow-${side}: auto;

        ${scrollbarStyles()}
    `;
};

export const scrollbarStyles = () => {
    return css`
        scrollbar-color: ${getCommon("scrollbar.trackColor")} ${getCommon("borderRadius.scrollbar")};
        scrollbar-width: ${pxToRem(10)};

        ::-webkit-scrollbar {
            width: ${(props) => {
                const widthPx = getCommon("scrollbar.widthPx");

                return pxToRem(widthPx(props) as unknown as number);
            }};
            cursor: pointer;
        }

        ::-webkit-scrollbar-track {
            background: ${getCommon("scrollbar.trackColor")};
        }

        ::-webkit-scrollbar-thumb {
            background: ${getCommon("scrollbar.thumbColor")};
            border-radius: ${getCommon("borderRadius.scrollbar")};

            &:hover {
                background: ${getCommon("scrollbar.thumbHoverColor")};
            }
        }
    `;
};
