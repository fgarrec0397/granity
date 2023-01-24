import {
    FormField,
    FormFieldStylesProps,
    StyledWrapper,
    StyledWrapperProps,
    Typography,
} from "@granity/ui";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { getTypography, pxToRem } from "@granity-engine/Themes/utils";
import { FC } from "react";
import { css } from "styled-components";

type EditorWidgetPropertyFieldsStyles = {
    section?: StyledWrapperProps;
    inputGroup?: StyledWrapperProps;
    formField?: FormFieldStylesProps;
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
                            labelProps={{
                                name: x.label,
                                labelPosition: "left",
                            }}
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
