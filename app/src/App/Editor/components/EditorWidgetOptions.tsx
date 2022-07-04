import { trigger } from "@app/Core/_actions/utilities/events";
import useWidgets from "@widgets/_actions/hooks/useWidgets";
import { FieldType, WidgetBaseOptions, WidgetOptionsValues } from "@widgets/_actions/widgetsTypes";
import { Card, Input, InputNumber, Select, Typography } from "antd";
import { FC, useEffect, useState } from "react";

const { Option } = Select;

const EditorWidgetOptions: FC = () => {
    const { currentWidgets, getWidgetDictionaryFromWidget } = useWidgets();
    const [optionsValues, setOptionsValues] = useState<WidgetOptionsValues>();
    const [selectValue, setSelectValue] = useState("default");
    const [inputValue, setInputValue] = useState("default");

    useEffect(() => {
        const options = getWidgetDictionaryFromWidget(currentWidgets[0]?.id)?.options;
        setOptionsValues(options);
        console.log(options, "options");
    }, [currentWidgets, getWidgetDictionaryFromWidget]);

    // Add input number useState + make sure if there is more than one same type input it still work

    const handleSelectChange = (value: string, option: WidgetBaseOptions) => {
        setSelectValue(value);
        trigger("updateCurrentWidgetOptions", { value, option });
    };

    const handleInputChange = (value: string, option: WidgetBaseOptions) => {
        setInputValue(value);
        trigger("updateCurrentWidgetOptions", { value, option });
    };

    // function onChange(index, event) {
    //     const newValues = [...values];
    //     newValues[index] = event.target.value;
    //     setValues(newValues);
    //   }

    return (
        <Card size="small" bordered={false} bodyStyle={{ padding: "0" }}>
            {currentWidgets.length > 1 ? (
                <Typography>Impossible to edit widget while more than one is selected</Typography>
            ) : (
                currentWidgets.length > 0 &&
                currentWidgets[0].widgetDefinition.options?.map((option) => {
                    if (option.fieldType === FieldType.Text) {
                        return (
                            <Input
                                placeholder={option.displayName}
                                onChange={(event) => handleInputChange(event.target.value, option)}
                                value={inputValue}
                            />
                        );
                    }

                    if (option.fieldType === FieldType.Number) {
                        return (
                            <InputNumber
                                placeholder={option.displayName}
                                onChange={(value: string) => handleSelectChange(value, option)}
                            />
                        );
                    }

                    if (option.fieldType === FieldType.Select) {
                        return (
                            <Select
                                defaultValue="default"
                                value={selectValue}
                                onChange={(value: string) => handleSelectChange(value, option)}
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
                        );
                    }

                    return null;
                })
            )}
        </Card>
    );
};

export default EditorWidgetOptions;
