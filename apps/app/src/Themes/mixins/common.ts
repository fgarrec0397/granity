import getFocus from "@themes/utils/getFocus";
import { css } from "styled-components";

export const actionStyles = () => {
    return css`
        ${focusStyles()}

        cursor: pointer;

        &[aria-disabled="true"] {
            cursor: not-allowed;
        }
    `;
};

export const focusStyles = () => {
    return css`
        &:focus,
        &:focus-visible,
        &[data-focus-visible] {
            outline-offset: ${getFocus("alt.borderOffset")};
            outline: ${getFocus("alt.borderWidth")} solid ${getFocus("alt.borderColor")};
        }
    `;
};
