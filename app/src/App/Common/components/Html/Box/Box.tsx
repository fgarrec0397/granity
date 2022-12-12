import { HasChildren } from "@app/Common/commonTypes";
import { boxStyles as baseBoxStyles } from "@themes/mixins/box";
import { FC } from "react";
import { css } from "styled-components";

import StyledWrapper, { StyledWrapperProps } from "../StyledWrapper";

export type BoxStyles = {
    wrapper?: StyledWrapperProps;
};

const boxStyles: BoxStyles = {
    wrapper: {
        css: css`
            ${baseBoxStyles()}
        `,
    },
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type BoxComponents = {};

type Props = BoxComponents & HasChildren;

const styles = boxStyles;

const Box: FC<Props> = ({ children }) => {
    return <StyledWrapper {...styles.wrapper}>{children}</StyledWrapper>;
};

export default Box;
