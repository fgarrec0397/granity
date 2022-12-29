import { HasChildren } from "@app/Common/commonTypes";
import { ThemedFlattenInterpolation } from "@themes/_typings";
import { labelStyles } from "@themes/mixins/form";
import { pxToRem } from "@themes/utils";
import { FormLabel, FormLabelProps } from "ariakit";
import styled, { css } from "styled-components";

export type LabelStylesProps = {
    additionalCss?: ThemedFlattenInterpolation;
};

export type LabelComponentProps = FormLabelProps & {
    labelPosition?: "left" | "top";
};

export type LabelProps = LabelStylesProps & LabelComponentProps;

type Props = LabelProps & HasChildren;

const Label = styled(FormLabel)<Props>`
    ${labelStyles()}

    ${({ labelPosition }) => css`
        ${labelPosition === "left" &&
        css`
            margin-right: ${pxToRem(8)};
            margin-bottom: 0;
        `}
    `}

    ${({ additionalCss }) => additionalCss}
`;

export default Label;
