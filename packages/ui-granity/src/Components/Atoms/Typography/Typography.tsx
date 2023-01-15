import { FC, ReactNode } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

export interface TypographyStylesProps {
    css?: FlattenSimpleInterpolation;
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
