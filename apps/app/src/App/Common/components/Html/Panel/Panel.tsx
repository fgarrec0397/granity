import { HasChildren } from "@app/Common/commonTypes";
import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import useMergeStyles from "@themes/hooks/useMergeStyles";
import pxToRem from "@themes/utils/pxToRem";
import { FC } from "react";
import { css } from "styled-components";

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
