import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import Typography, { TypographyStyles } from "@app/Common/components/Html/Typography";
import { trigger } from "@app/Core/_actions/utilities/events";
import useWidgets from "@widgets/_actions/hooks/useWidgets";
import { FieldType, WidgetBaseOptions, WidgetOptionsValues } from "@widgets/_actions/widgetsTypes";
import { Card, Input, InputNumber, Select } from "antd";
import { FC, useEffect, useState } from "react";
import { css } from "styled-components";

const { Option } = Select;

interface EditorWidgetOptionsStyles {
    inputsWrapper?: StyledWrapperProps;
    label?: TypographyStyles;
}

const styles: EditorWidgetOptionsStyles = {
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

const EditorWidgetOptions: FC = () => {
    const { currentWidgets, getWidgetDictionaryFromWidget } = useWidgets();
    const [optionsValues, setOptionsValues] = useState<WidgetOptionsValues>();

    useEffect(() => {
        const options = getWidgetDictionaryFromWidget(currentWidgets[0]?.id)?.options;
        setOptionsValues(options);
    }, [currentWidgets, getWidgetDictionaryFromWidget]);

    const handleChange = (value: string | number, option: WidgetBaseOptions) => {
        setOptionsValues({
            ...optionsValues,
            [option.name]: {
                fieldType: option.fieldType,
                value,
            },
        });

        trigger("updateCurrentWidgetOptions", { value, option });
    };

    return (
        <Card size="small" bordered={false} bodyStyle={{ padding: "0" }}>
            {currentWidgets.length > 1 ? (
                <Typography>Impossible to edit widget while more than one is selected</Typography>
            ) : (
                currentWidgets.length > 0 &&
                currentWidgets[0].widgetDefinition.options?.map((option) => {
                    if (option.fieldType === FieldType.Text) {
                        return (
                            <StyledWrapper {...styles.inputsWrapper}>
                                <Typography as="label" {...styles.label}>
                                    {option.displayName}
                                </Typography>
                                <Input
                                    placeholder={option.displayName}
                                    onChange={(event) => handleChange(event.target.value, option)}
                                    value={optionsValues ? optionsValues[option.name].value : ""}
                                />
                            </StyledWrapper>
                        );
                    }

                    if (option.fieldType === FieldType.Number) {
                        return (
                            <StyledWrapper {...styles.inputsWrapper}>
                                <Typography as="label" {...styles.label}>
                                    {option.displayName}
                                </Typography>
                                <InputNumber
                                    placeholder={option.displayName}
                                    onChange={(value: number) => handleChange(value, option)}
                                    value={
                                        optionsValues
                                            ? (optionsValues[option.name].value as number)
                                            : 0
                                    }
                                    style={{ width: "100%" }}
                                />
                            </StyledWrapper>
                        );
                    }

                    if (option.fieldType === FieldType.Select) {
                        return (
                            <StyledWrapper {...styles.inputsWrapper}>
                                <Typography as="label" {...styles.label}>
                                    {option.displayName}
                                </Typography>
                                <Select
                                    defaultValue="default"
                                    value={
                                        optionsValues
                                            ? (optionsValues[option.name].value as string)
                                            : ""
                                    }
                                    onChange={(value: string) => handleChange(value, option)}
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
                })
            )}
        </Card>
    );
};

export default EditorWidgetOptions;
