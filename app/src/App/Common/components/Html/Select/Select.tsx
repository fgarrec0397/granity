import { actionStyles } from "@themes/mixins/common";
import { inputStyles, labelStyles } from "@themes/mixins/form";
import { getColor, getCommon, pxToRem } from "@themes/utils";
import { FormInputOptions, FormLabelOptions } from "ariakit";
import {
    Select as SelectLib,
    SelectItem,
    SelectItemOptions,
    SelectLabel,
    SelectPopover,
    SelectPopoverOptions,
    useSelectState,
} from "ariakit/select";
import { FC } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

import { FormFieldStyles } from "../FormField/FormField";
import StyledWrapper, { StyledWrapperProps } from "../StyledWrapper";

export type SelectStyles = {
    styling?: {
        wrapperCss?: FlattenSimpleInterpolation;
        labelCss?: FlattenSimpleInterpolation;
        inputCss?: FlattenSimpleInterpolation;
        errorCss?: FlattenSimpleInterpolation;
    };
};

export type FormFieldComponentProps = {
    defaultValue?: string;
    label?: string;
    labelPosition?: "left" | "top";
    options: SelectItemOptions<"div">[];
} & import("ariakit-utils/types").Component<SelectPopoverOptions<"div">>;

type Props = SelectStyles & FormFieldComponentProps;

const StyledSelectLabel = styled(SelectLabel)<SelectStyles>`
    ${labelStyles()}

    ${({ styling }) => styling?.labelCss}
`;

const StyledSelectInput = styled(SelectLib)<
    FormFieldStyles & any /* TODO - Find why there an issue with the props type */
>`
    ${inputStyles()}
    ${actionStyles()}

    ${({ styling }) => styling?.inputCss}
`;

const StyledSelectPopover = styled(SelectPopover)<
    FormFieldStyles & any /* TODO - Find why there an issue with the props type */
>`
    display: block;
    background-color: ${getColor("common.backgroundLight")};
    border-radius: ${getCommon("borderRadius.popover")};

    ${({ styling }) => styling?.inputCss}
`;

const StyledSelectItem = styled(SelectItem)`
    display: flex;
    align-items: center;
    padding: ${pxToRem(8)};
    scroll-margin: ${pxToRem(8)};
    cursor: pointer;
    border-radius: 0;

    &:first-child {
        border-top-left-radius: ${getCommon("borderRadius.popover")};
        border-top-right-radius: ${getCommon("borderRadius.popover")};
    }

    &:last-child {
        border-bottom-left-radius: ${getCommon("borderRadius.popover")};
        border-bottom-right-radius: ${getCommon("borderRadius.popover")};
    }

    &:hover,
    &[data-active-item] {
        background-color: ${getColor("common.active")};
        color: ${getColor("common.activeContrast")};
    }

    &[aria-disabled="true"] {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const Select: FC<Props> = ({ defaultValue, label, labelPosition, options, styling }) => {
    const selectState = useSelectState({
        defaultValue,
        sameWidth: true,
        gutter: 4,
    });

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
            <StyledSelectLabel state={selectState}>{label}</StyledSelectLabel>
            <StyledSelectInput state={selectState} />
            <StyledSelectPopover
                state={selectState}
                portal
                onChange={() => {
                    console.log("changed");
                }}
            >
                {options.map((x) => (
                    <StyledSelectItem key={x.value} {...x}>
                        test
                    </StyledSelectItem>
                ))}
            </StyledSelectPopover>
        </StyledWrapper>
    );
};

export default Select;
