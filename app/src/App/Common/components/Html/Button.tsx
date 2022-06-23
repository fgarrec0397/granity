import { Button as LibButton, ButtonProps } from "antd";
import { FC } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

export interface ButtonStyles {
    css?: FlattenSimpleInterpolation;
}

export type ButtonComponents = ButtonProps;

type Props = ButtonStyles & ButtonComponents;

const StyledButton = styled(LibButton)<ButtonStyles>`
    font-weight: bold;

    ${(props) => props.css}
`;

const Button: FC<Props> = ({ css, children, ...props }) => {
    return (
        <StyledButton shape="round" css={css} {...props}>
            {children}
        </StyledButton>
    );
};

export default Button;
