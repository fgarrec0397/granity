import { HasChildren } from "@granity/helpers";
import { Button as LibButton, ButtonProps as LibButtonProps } from "ariakit/button";
import { FC } from "react";
import styled, { css } from "styled-components";

import { baseButtonStyles } from "../../../Themes/mixins/button";
import { actionStyles } from "../../../Themes/mixins/common";
import { ThemedFlattenInterpolation } from "../../../Themes/types";
import { getColor, getTypography } from "../../../Themes/utils";
import pxToRem from "../../../Themes/utils/pxToRem";

export type ButtonStyleTypes = "outlined" | "filled" | "none";

export type ButtonStylesProps = {
    isFullWidth?: boolean;
    noStyles?: boolean;
    styleType?: ButtonStyleTypes;
    css?: ThemedFlattenInterpolation;
};

export type ButtonComponents = LibButtonProps;

export type ButtonProps = ButtonStylesProps & ButtonComponents & HasChildren;

const PureButton: FC<ButtonProps> = ({ isFullWidth, styleType, ...props }) => (
    <LibButton {...props} />
);

const StyledButton = styled(PureButton)<ButtonStylesProps>`
    font-size: ${getTypography("size.smaller")};
    font-weight: ${getTypography("weight.bold")};

    ${({ styleType, isFullWidth }) => {
        if (styleType === "outlined") {
            return css`
                ${baseButtonStyles(isFullWidth)}
                background-color: transparent;
                color: ${getColor("common.text")};
                border: ${pxToRem(1)} solid ${getColor("common.text")};

                &:hover {
                    background-color: ${getColor("common.backgroundLight")};
                    border-color: ${getColor("common.backgroundLight")};
                }
            `;
        }

        if (styleType === "filled") {
            return css`
                ${baseButtonStyles(isFullWidth)}
                background-color: ${getColor("primary.main")};
                color: ${getColor("primary.contrast")};
                border: ${pxToRem(1)} solid ${getColor("primary.main")};

                &:hover {
                    background-color: ${getColor("primary.hover")};
                    border-color: ${getColor("primary.hover")};
                }
            `;
        }

        if (styleType === "none") {
            return css`
                ${baseButtonStyles(isFullWidth)}
                ${actionStyles()}
                padding: 0;
                background-color: transparent;
                border: none;
                border-radius: 0;
            `;
        }
    }}

    ${(props) => props.css}
`;

const Button: FC<ButtonProps> = ({ children, isFullWidth, styleType, noStyles, ...props }) => {
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
