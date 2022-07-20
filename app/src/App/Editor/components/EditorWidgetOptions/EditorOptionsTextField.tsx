import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import Typography, { TypographyStyles } from "@app/Common/components/Html/Typography";
import { FieldType, WidgetBaseOptions } from "@widgets/_actions/widgetsTypes";
import { Input } from "antd";
import { FC } from "react";
import { css } from "styled-components";

import useOptionsValues from "./hooks/useOptionsValues";

type Props = {
    option: WidgetBaseOptions;
};

interface EditorOptionsTextFieldStyles {
    inputsWrapper?: StyledWrapperProps;
    label?: TypographyStyles;
}

const styles: EditorOptionsTextFieldStyles = {
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

const EditorOptionsTextField: FC<Props> = ({ option }) => {
    const { optionsValues, updateOptionsValues } = useOptionsValues();

    const handleChange = (value: string | number) => {
        updateOptionsValues(value, option);
    };

    if (option.fieldType === FieldType.Text) {
        return (
            <StyledWrapper {...styles.inputsWrapper}>
                <Typography as="label" {...styles.label}>
                    {option.displayName}
                </Typography>
                <Input
                    placeholder={option.displayName}
                    onChange={(event) => handleChange(event.target.value)}
                    value={optionsValues ? optionsValues[option.name]?.value : ""}
                />
            </StyledWrapper>
        );
    }

    return null;
};

export default EditorOptionsTextField;
