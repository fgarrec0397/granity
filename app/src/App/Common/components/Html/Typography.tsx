import { FC } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

export interface TypographyStyles {
    css?: FlattenSimpleInterpolation;
}

export interface TypographyComponent {
    as?: string;
}

type Props = TypographyComponent & TypographyStyles;

const Typography: FC<Props> = ({ as = "span", css, children, ...props }) => {
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
