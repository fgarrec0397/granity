import { ThemedFlattenInterpolation } from "@themes/_typings";
import { inputStyles, labelStyles } from "@themes/mixins/form";
import { pxToRem } from "@themes/utils";
import {
    FormError,
    FormErrorProps,
    FormInput,
    FormInputProps,
    FormLabel,
    FormLabelProps,
} from "ariakit";
import { FC } from "react";
import styled, { css } from "styled-components";

import StyledWrapper, { StyledWrapperProps } from "../StyledWrapper";

export type FormFieldStyles = {
    styling?: {
        wrapperCss?: ThemedFlattenInterpolation;
        labelCss?: ThemedFlattenInterpolation;
        inputCss?: ThemedFlattenInterpolation;
        errorCss?: ThemedFlattenInterpolation;
    };
};

export type FormFieldComponentProps = {
    label?: string;
    labelPosition?: "left" | "top";
    size?: "medium" | "small";
    labelProps?: FormLabelProps;
    inputProps?: FormInputProps;
    errorProps?: FormErrorProps;
};

type Props = FormFieldStyles & FormFieldComponentProps;

const StyledFormLabel = styled(FormLabel)<
    FormFieldStyles & Pick<FormFieldComponentProps, "labelPosition">
>`
    ${labelStyles()}

    ${({ labelPosition }) => css`
        ${labelPosition === "left" &&
        css`
            margin-right: ${pxToRem(8)};
            margin-bottom: 0;
        `}
    `}

    ${({ styling }) => styling?.labelCss}
`;

const StyledFormInput = styled(FormInput)<
    FormFieldStyles & any /* TODO - Find why there an issue with the props type */
>`
    ${inputStyles()}

    ${({ styling }) => styling?.inputCss}
`;

const StyledFormError = styled(FormError)<
    FormFieldStyles & any /* TODO - Find why there an issue with the props type */
>`
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
                <StyledFormLabel
                    labelPosition={labelPosition}
                    {...(labelProps || {})}
                    {...styling?.labelCss}
                >
                    {label}
                </StyledFormLabel>
            ) : null}
            <StyledFormInput {...(inputProps || {})} {...styling?.inputCss} />
            <StyledFormError {...(errorProps || {})} {...styling?.errorCss} />
        </StyledWrapper>
    );
};

export default FormField;
