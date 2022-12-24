import { ThemedFlattenInterpolation } from "@themes/_typings";
import { FC, ReactNode } from "react";
import styled from "styled-components";

export interface TypographyStylesProps {
    css?: ThemedFlattenInterpolation;
}

export interface TypographyComponent {
    as?: string;
    children: ReactNode;
}

export type TypographyProps = TypographyComponent & TypographyStylesProps;

const Typography: FC<TypographyProps> = ({ as = "span", css, children, ...props }) => {
    const AsComponent: any = as;
    return (
        <AsComponent css={css} {...props}>
            {children}
        </AsComponent>
    );
};

const StyledTypography = styled(Typography)`
    line-height: 1.2;
    ${(props) => props.css}
`;

export default StyledTypography;
