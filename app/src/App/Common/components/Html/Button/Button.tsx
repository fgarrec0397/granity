import pxToRem from "@themes/utils/pxToRem";
import { Button as LibButton, ButtonProps } from "ariakit/button";
import { FC, ReactNode } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

export type ButtonStyleTypes = "outlined" | "filled" | "none";

export type ButtonStyles = {
    isFullWidth?: boolean;
    styleType?: ButtonStyleTypes;
    css?: FlattenSimpleInterpolation;
};

export type ButtonComponents = ButtonProps;

type Props = ButtonStyles &
    ButtonComponents & {
        children: ReactNode;
    };

const PureButton: FC<Props> = ({ isFullWidth, styleType, ...props }) => <LibButton {...props} />;

const StyledButton = styled(PureButton)<ButtonStyles>`
    font-size: ${({ theme }) => theme.typography.size.tiny};
    font-weight: ${({ theme }) => theme.typography.weight.bold};

    ${({ styleType, isFullWidth, theme }) => {
        const baseButtonStyles = css`
            padding: ${pxToRem(6, 20)};
            width: ${isFullWidth ? "100%" : "auto"};
            text-align: center;
            border-radius: ${theme.common.borderRadius.button};
            cursor: pointer;

            // eslint-disable-next-line
            ${`&[aria-disabled="true"]`} {
                cursor: not-allowed;
            }
        `;

        if (styleType === "outlined") {
            return css`
                ${baseButtonStyles}
                background-color: transparent;
                color: ${theme.colors.primary.main};
                border: ${pxToRem(1)} solid ${theme.colors.primary.main};

                &:hover {
                    background-color: ${theme.colors.primary.main};
                    color: ${theme.colors.primary.contrast};
                }
            `;
        }

        if (styleType === "filled") {
            return css`
                ${baseButtonStyles}
                background-color: ${theme.colors.primary.main};
                color: ${theme.colors.primary.contrast};
                border: ${pxToRem(1)} solid ${theme.colors.primary.main};

                &:hover {
                    background-color: ${theme.colors.primary.hover};
                    border-color: ${theme.colors.primary.hover};
                }
            `;
        }

        return css`
            ${baseButtonStyles}
            padding: 0;
            background-color: transparent;
            border: none;
        `;
    }}

    ${(props) => props.css}
`;

const Button: FC<Props> = ({ children, isFullWidth, styleType, ...props }) => {
    return (
        <StyledButton isFullWidth={isFullWidth} styleType={styleType} {...props}>
            {children}
        </StyledButton>
    );
};

Button.defaultProps = {
    styleType: "filled",
};

export default Button;
