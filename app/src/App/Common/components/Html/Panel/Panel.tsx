import { HasChildren } from "@app/Common/commonTypes";
import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import pxToRem from "@themes/utils/pxToRem";
import { FC } from "react";
import { css } from "styled-components";

export type PanelProps = HasChildren;

type Props = PanelProps;

interface PanelStyles {
    wrapper?: StyledWrapperProps;
}

const styles: PanelStyles = {
    wrapper: {
        css: css`
            width: ${pxToRem(300)};
            user-select: none;
        `,
    },
};

const Panel: FC<Props> = ({ children }) => {
    return <StyledWrapper {...styles.wrapper}>{children}</StyledWrapper>;
};

export default Panel;
