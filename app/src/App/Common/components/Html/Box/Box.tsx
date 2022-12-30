import { HasChildren } from "@app/Common/commonTypes";
import useMergeStyles from "@themes/hooks/useMergeStyles";
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
export type BoxComponents = {
    styling?: BoxStyles;
};

type Props = BoxComponents & HasChildren;

const Box: FC<Props> = ({ children, styling }) => {
    const styles = useMergeStyles(styling, boxStyles);

    return <StyledWrapper {...styles.wrapper}>{children}</StyledWrapper>;
};

export default Box;
