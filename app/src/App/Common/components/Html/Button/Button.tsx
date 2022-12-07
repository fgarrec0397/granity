import { getColor, getCommon, getTypography } from "@themes/utils";
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
    font-size: ${getTypography("size.tiny")};
    font-weight: ${getTypography("weight.bold")};

    ${({ styleType, isFullWidth }) => {
        const baseButtonStyles = css`
            padding: ${pxToRem(6, 20)};
            width: ${isFullWidth ? "100%" : "auto"};
            text-align: center;
            border-radius: ${getCommon("borderRadius.button")};
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
                color: ${getColor("primary.main")};
                border: ${pxToRem(1)} solid ${getColor("primary.main")};

                &:hover {
                    background-color: ${getColor("primary.main")};
                    color: ${getColor("primary.contrast")};
                }
            `;
        }

        if (styleType === "filled") {
            return css`
                ${baseButtonStyles}
                background-color: ${getColor("primary.main")};
                color: ${getColor("primary.contrast")};
                border: ${pxToRem(1)} solid ${getColor("primary.main")};

                &:hover {
                    background-color: ${getColor("primary.hover")};
                    border-color: ${getColor("primary.hover")};
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
