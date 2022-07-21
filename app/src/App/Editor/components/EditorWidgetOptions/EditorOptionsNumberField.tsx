import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import Typography, { TypographyStyles } from "@app/Common/components/Html/Typography";
import { FieldType, WidgetBaseOptions } from "@widgets/_actions/widgetsTypes";
import { InputNumber } from "antd";
import { FC } from "react";
import { css } from "styled-components";

import useOptionsValues from "./hooks/useOptionsValues";

type Props = {
    option: WidgetBaseOptions;
};

interface EditorOptionsNumberFieldStyles {
    inputsWrapper?: StyledWrapperProps;
    label?: TypographyStyles;
}

const styles: EditorOptionsNumberFieldStyles = {
    inputsWrapper: {
        css: css`
            margin-top: 1rem;

            &:first-child {
                margin-top: 0;
            }
        `,
    },
    label: {},
};

const EditorOptionsNumberField: FC<Props> = ({ option }) => {
    const { optionsValues, updateOptionsValues } = useOptionsValues();

    const handleChange = (value: string | number) => {
        updateOptionsValues(value, option);
    };

    if (option.fieldType === FieldType.Number) {
        return (
            <StyledWrapper {...styles.inputsWrapper}>
                <Typography as="label" {...styles.label}>
                    {option.displayName}
                </Typography>
                <InputNumber
                    placeholder={option.displayName}
                    onChange={(value: number) => handleChange(value)}
                    value={optionsValues ? (optionsValues[option.name]?.value as number) : 0}
                    style={{ width: "100%" }}
                />
            </StyledWrapper>
        );
    }

    return null;
};

export default EditorOptionsNumberField;
