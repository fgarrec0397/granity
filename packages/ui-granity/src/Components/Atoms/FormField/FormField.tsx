import { ThemedFlattenInterpolation } from "../../../Themes/_typings";
import { inputStyles } from "../../../Themes/mixins/form";
import { FormError, FormErrorProps, FormInput, FormInputProps } from "ariakit";
import { uidGenerator } from "helpers-granity";
import { FC, useMemo } from "react";
import styled, { css } from "styled-components";

import Label, { LabelProps } from "../Label/Label";
import StyledWrapper, { StyledWrapperProps } from "../StyledWrapper/StyledWrapper";

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
    size?: "medium" | "small";
    labelProps?: LabelProps;
    inputProps?: FormInputProps;
    errorProps?: FormErrorProps;
};

type Props = FormFieldStyles & FormFieldComponentProps;

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

const FormField: FC<Props> = ({ label, labelProps, inputProps, errorProps, styling }) => {
    const labelPropsMemo = useMemo(() => {
        return {
            ...labelProps,
            name: labelProps?.name || uidGenerator(),
        };
    }, [labelProps]);

    const wrapperStyles: StyledWrapperProps = {
        css: css`
            ${styling?.wrapperCss}
            display: flex;

            ${labelProps?.labelPosition === "left"
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
                <Label
                    labelPosition={labelProps?.labelPosition}
                    additionalCss={styling?.labelCss}
                    {...labelPropsMemo}
                >
                    {label}
                </Label>
            ) : null}
            <StyledFormInput {...(inputProps || {})} {...styling?.inputCss} />
            <StyledFormError {...(errorProps || {})} {...styling?.errorCss} />
        </StyledWrapper>
    );
};

export default FormField;
