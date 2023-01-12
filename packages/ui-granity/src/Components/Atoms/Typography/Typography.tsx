import { FC, ReactNode } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

export interface TypographyStyles {
    css?: FlattenSimpleInterpolation;
}

export interface TypographyComponent {
    as?: string;
    children: ReactNode;
}

export type TypographyProps = TypographyComponent & TypographyStyles;

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
