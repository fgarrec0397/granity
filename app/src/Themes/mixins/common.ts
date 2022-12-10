import getFocus from "@themes/utils/getFocus";
import { css } from "styled-components";

export const actionStyles = () => {
    return css`
        cursor: pointer;

        // eslint-disable-next-line
        ${`&[aria-disabled="true"]`} {
            cursor: not-allowed;
        }

        &:focus,
        &:focus-visible,
        &[data-focus-visible] {
            outline: ${getFocus("main.borderWidth")} solid ${getFocus("main.borderColor")};
        }
    `;
};
