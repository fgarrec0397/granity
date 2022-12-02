// import { Button as LibButton, ButtonProps } from "antd"
import { Button as LibButton, ButtonProps } from "ariakit/button";
import { FC, ReactNode } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

export interface ButtonStyles {
    css?: FlattenSimpleInterpolation;
}

export type ButtonComponents = ButtonProps;

type Props = ButtonStyles &
    ButtonComponents & {
        children: ReactNode;
    };

const StyledButton = styled(LibButton)<ButtonStyles>`
    padding: 0.25em 1em;
    width: 100%;
    font-size: 1em;
    color: ${({ theme }) => theme.colors.primary.contrast};
    background-color: ${({ theme }) => theme.colors.primary.main};
    border

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
