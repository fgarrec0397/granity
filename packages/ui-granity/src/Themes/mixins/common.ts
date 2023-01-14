import { css } from "styled-components";

import getFocus from "../utils/getFocus";

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
