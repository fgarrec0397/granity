// import { Button as LibButton, ButtonProps } from "antd"
import pxToRem from "@themes/utils/pxToRem";
import { Button as LibButton, ButtonProps } from "ariakit/button";
import { FC, ReactNode } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

export interface ButtonStyles {
    isFullWidth?: boolean;
    css?: FlattenSimpleInterpolation;
}

export type ButtonComponents = ButtonProps;

type Props = ButtonStyles &
    ButtonComponents & {
        children: ReactNode;
    };

const StyledButton = styled(LibButton)<ButtonStyles>`
    padding: ${pxToRem(6, 20)};
    width: ${({ isFullWidth }) => (isFullWidth ? "100%" : "auto")};
    font-size: ${({ theme }) => theme.typography.size.tiny};
    font-weight: ${({ theme }) => theme.typography.weight.bold};
    color: ${({ theme }) => theme.colors.primary.contrast};
    background-color: ${({ theme }) => theme.colors.primary.main};
    border: ${pxToRem(1)} solid ${({ theme }) => theme.colors.primary.main};
    border-radius: ${pxToRem(4)};

    &:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.primary.hover};
    }

    ${(props) => props.css}
`;

const Button: FC<Props> = ({ css, children, ...props }) => {
    return (
        <StyledButton css={css} {...props}>
            {children}
        </StyledButton>
    );
};

export default Button;
