import { FC, ReactNode } from "react";
import styled from "styled-components";

import { ThemedFlattenInterpolation } from "../../../Themes/types";

export interface TypographyStylesProps {
    css?: ThemedFlattenInterpolation;
}

export interface TypographyComponentProps {
    as?: string;
    children: ReactNode;
}

export type TypographyProps = TypographyComponentProps & TypographyStylesProps;

const Typography: FC<TypographyProps> = ({ as = "span", css, children, ...props }) => {
    const AsComponent: any = as;

    return (
        <AsComponent css={css} {...props}>
            {children}
        </AsComponent>
    );
};

const StyledTypography = styled(Typography)`
    ${(props) => props.css}
`;

export default StyledTypography;
