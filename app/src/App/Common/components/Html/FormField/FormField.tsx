import { getColor, getCommon } from "@themes/utils";
import getFocus from "@themes/utils/getFocus";
import pxToRem from "@themes/utils/pxToRem";
import {
    FormError,
    FormErrorOptions,
    FormInput,
    FormInputOptions,
    FormLabel,
    FormLabelOptions,
} from "ariakit";
import { FC } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

import StyledWrapper, { StyledWrapperProps } from "../StyledWrapper";

export type FormFieldStyles = {
    styling?: {
        wrapperCss?: FlattenSimpleInterpolation;
        labelCss?: FlattenSimpleInterpolation;
        inputCss?: FlattenSimpleInterpolation;
        errorCss?: FlattenSimpleInterpolation;
    };
};

export type FormFieldComponentProps = {
    label?: string;
    labelPosition?: "left" | "top";
    labelProps: FormLabelOptions<"label">;
    inputProps: FormInputOptions<"input">;
    errorProps: FormErrorOptions<"div">;
};

type Props = FormFieldStyles & FormFieldComponentProps;

const StyledFormLabel = styled(FormLabel)<FormFieldStyles>`
    margin-bottom: ${pxToRem(10)};

    ${({ styling }) => styling?.labelCss}
`;

const StyledFormInput = styled(FormInput)<
    FormFieldStyles & any /* TODO - Find why there an issue with the props type */
>`
    background-color: ${getColor("common.backgroundLight")};
    border: ${getFocus("borderWidth")} solid ${getColor("common.backgroundLight")};
    border-radius: ${getCommon("borderRadius.formField")};

    &:focus,
    &:focus-visible,
    &[data-focus-visible] {
        outline: ${getFocus("main.borderWidth")} solid ${getFocus("main.borderColor")};
    }

    ${({ styling }) => styling?.inputCss}
`;

const StyledFormError = styled(FormError)<FormFieldStyles>`
    ${({ styling }) => styling?.errorCss}
`;

const FormField: FC<Props> = ({
    label,
    labelPosition,
    labelProps,
    inputProps,
    errorProps,
    styling,
}) => {
    const wrapperStyles: StyledWrapperProps = {
        css: css`
            ${styling?.wrapperCss}
            display: flex;

            ${labelPosition === "left"
                ? css`
                      flex-direction: row;
                      align-items: center;
                  `
                : css`
                      flex-direction: column;
                  `}
        `,
    };

    return (
        <StyledWrapper {...wrapperStyles}>
            {label ? (
                <StyledFormLabel {...labelProps} {...styling?.labelCss}>
                    {label}
                </StyledFormLabel>
            ) : null}
            <StyledFormInput {...inputProps} {...styling?.inputCss} />
            <StyledFormError {...errorProps} {...styling?.errorCss} />
        </StyledWrapper>
    );
};

export default FormField;
