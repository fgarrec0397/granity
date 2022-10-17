import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import Typography, { TypographyStyles } from "@app/Common/components/Html/Typography";
import { FieldType, WidgetBaseOptions } from "@app/Widgets/_actions/widgetsTypes";
import { Select } from "antd";
import { FC } from "react";
import { css } from "styled-components";

import useOptionsValues from "./hooks/useOptionsValues";

const { Option } = Select;

type Props = {
    option: WidgetBaseOptions;
};

interface EditorOptionsSelectFieldStyles {
    inputsWrapper?: StyledWrapperProps;
    label?: TypographyStyles;
}

const styles: EditorOptionsSelectFieldStyles = {
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

const EditorOptionsSelectField: FC<Props> = ({ option }) => {
    const { optionsValues, updateOptionsValues } = useOptionsValues();

    const handleChange = (value: string | number) => {
        updateOptionsValues(value, option);
    };

    if (option.fieldType === FieldType.Select) {
        return (
            <StyledWrapper {...styles.inputsWrapper}>
                <Typography as="label" {...styles.label}>
                    {option.displayName}
                </Typography>
                <Select
                    defaultValue="default"
                    value={optionsValues ? (optionsValues[option.name]?.value as string) : ""}
                    onChange={(value: string) => handleChange(value)}
                    style={{ width: "100%" }}
                >
                    <Option value="default" disabled>
                        Select an option
                    </Option>
                    {option.selectOptions?.map((selectionOption, index) => (
                        <Option key={index} value={selectionOption.value}>
                            {selectionOption.name}
                        </Option>
                    ))}
                </Select>
            </StyledWrapper>
        );
    }

    return null;
};

export default EditorOptionsSelectField;
