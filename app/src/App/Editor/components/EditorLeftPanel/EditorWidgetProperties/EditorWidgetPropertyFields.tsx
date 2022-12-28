import { Typography } from "@app/Common/components/Html";
import FormField, { FormFieldStyles } from "@app/Common/components/Html/FormField/FormField";
import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { getTypography, pxToRem } from "@themes/utils";
import { FC } from "react";
import { css } from "styled-components";

type EditorWidgetPropertyFieldsStyles = {
    section?: StyledWrapperProps;
    inputGroup?: StyledWrapperProps;
    formField?: FormFieldStyles;
};

const styles: EditorWidgetPropertyFieldsStyles = {
    section: {
        css: css`
            margin-bottom: ${pxToRem(12)};

            &:last-child {
                margin-bottom: 0;
            }
        `,
    },
    inputGroup: {
        css: css`
            display: flex;
            align-items: center;
        `,
    },
    formField: {
        styling: {
            inputCss: css`
                line-height: 1;
                font-size: ${getTypography("size.tiniest")};
            `,
            wrapperCss: css`
                width: 100%;
                max-width: calc(100% / 3 - ${pxToRem(12)});
                margin-right: ${pxToRem(12)};
            `,
        },
    },
};

type Props = {
    title: string;
    fields: {
        label: string;
        value: number;
    }[];
};

const EditorWidgetPropertyFields: FC<Props> = ({ title, fields }) => {
    const { selectedWidgets, currentWidgetProperties } = useWidgets();

    if (selectedWidgets[0] && currentWidgetProperties) {
        return (
            <StyledWrapper {...styles.section}>
                <Typography>{title}</Typography>
                <StyledWrapper {...styles.inputGroup}>
                    {fields.map((x) => (
                        <FormField
                            key={x.label}
                            label={x.label}
                            inputProps={{
                                name: x.label,
                                type: "number",
                                value: x.value,
                            }}
                            {...styles.formField}
                        />
                    ))}
                </StyledWrapper>
            </StyledWrapper>
        );
    }

    return null;
};

export default EditorWidgetPropertyFields;
