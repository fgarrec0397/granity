import { inputStyles, labelStyles } from "@themes/mixins/form";
import { getColor } from "@themes/utils";
import { FormErrorOptions, FormInputOptions, FormLabelOptions } from "ariakit";
import {
    Select as SelectLib,
    SelectItem,
    SelectLabel,
    SelectPopover,
    useSelectState,
} from "ariakit/select";
import { FC } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

import { FormFieldStyles } from "../FormField/FormField";
import StyledWrapper from "../StyledWrapper";

export type SelectStyles = {
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

type Props = SelectStyles & FormFieldComponentProps;

const StyledSelectLabel = styled(SelectLabel)<SelectStyles>`
    ${labelStyles()}

    ${({ styling }) => styling?.labelCss}
`;

const StyledSelectInput = styled(SelectLib)<
    FormFieldStyles & any /* TODO - Find why there an issue with the props type */
>`
    ${inputStyles()}

    ${({ styling }) => styling?.inputCss}
`;

const StyledSelectPopover = styled(SelectPopover)<
    FormFieldStyles & any /* TODO - Find why there an issue with the props type */
>`
    background-color: ${getColor("common.backgroundLight")};

    ${({ styling }) => styling?.inputCss}
`;

const StyledSelectItem = styled(SelectItem)`
    display: flex;
    cursor: default;
    scroll-margin: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.25rem;
    padding: 0.5rem;
    outline: none !important;

    &[data-active-item] {
        background-color: hsl(204 100% 40%);
        color: hsl(204 20% 100%);
    }

    &[aria-disabled="true"] {
        opacity: 0.5;
    }
`;

const wrapperStyles = css`
    position: relative;
`;

const Select: FC = () => {
    const select = useSelectState({
        defaultValue: "Apple",
        animated: true,
        sameWidth: true,
        gutter: 4,
    });

    return (
        <StyledWrapper css={wrapperStyles}>
            <StyledSelectLabel state={select}>Favorite fruit</StyledSelectLabel>
            <StyledSelectInput state={select} className="select" />
            <StyledSelectPopover state={select} className="popover">
                <StyledSelectItem className="select-item" value="Apple" />
                <StyledSelectItem className="select-item" value="Banana" />
                <StyledSelectItem className="select-item" value="Grape" disabled />
                <StyledSelectItem className="select-item" value="Orange" />
            </StyledSelectPopover>
        </StyledWrapper>
    );
};

export default Select;
