import { HasChildren } from "@app/Common/commonTypes";
import { ThemedFlattenInterpolation } from "@themes/_typings";
import { baseButtonStyles } from "@themes/mixins/buttons";
import { actionStyles } from "@themes/mixins/common";
import { getColor, getTypography } from "@themes/utils";
import pxToRem from "@themes/utils/pxToRem";
import { Button as LibButton, ButtonProps } from "ariakit/button";
import { FC } from "react";
import styled, { css } from "styled-components";

export type ButtonStyleTypes = "outlined" | "filled" | "none";

export type ButtonStylesProps = {
    isFullWidth?: boolean;
    noStyles?: boolean;
    styleType?: ButtonStyleTypes;
    css?: ThemedFlattenInterpolation;
};

export type ButtonComponents = ButtonProps;

type Props = ButtonStylesProps & ButtonComponents & HasChildren;

const PureButton: FC<Props> = ({ isFullWidth, styleType, ...props }) => <LibButton {...props} />;

const StyledButton = styled(PureButton)<ButtonStylesProps>`
    font-size: ${getTypography("size.tiny")};
    font-weight: ${getTypography("weight.bold")};

    ${({ styleType, isFullWidth }) => {
        if (styleType === "outlined") {
            return css`
                ${baseButtonStyles(isFullWidth)}
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
                margin: 0;
                background-color: transparent;
                border: none;
            `;
        }
    }}

    ${(props) => props.css}
`;

const Button: FC<Props> = ({ children, isFullWidth, styleType, noStyles, ...props }) => {
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
