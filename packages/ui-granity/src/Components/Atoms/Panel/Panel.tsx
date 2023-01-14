import { HasChildren } from "helpers-granity";
import { FC } from "react";
import { css } from "styled-components";

import useMergeStyles from "../../../Themes/hooks/useMergeStyles";
import pxToRem from "../../../Themes/utils/pxToRem";
import StyledWrapper, { StyledWrapperProps } from "../StyledWrapper/StyledWrapper";

export type PanelProps = HasChildren;

type Props = PanelProps & {
    width?: number;
};

export type PanelStyles = {
    wrapper?: StyledWrapperProps;
};

const panelStyles: PanelStyles = {
    wrapper: {
        css: css`
            width: 100%;
            max-width: ${pxToRem(300)};
            user-select: none;
        `,
    },
};

const Panel: FC<Props> = ({ children, width, ...otherProps }) => {
    const styles = useMergeStyles(otherProps, panelStyles);

    const wrapperStyles: StyledWrapperProps = {
        ...styles?.wrapper,
        css: css`
            ${styles?.wrapper?.css}

            ${width !== undefined &&
            css`
                max-width: ${pxToRem(width)};
            `}
        `,
    };

    return <StyledWrapper {...wrapperStyles}>{children}</StyledWrapper>;
};

export default Panel;
