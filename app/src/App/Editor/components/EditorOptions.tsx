import { trigger } from "@core/utilities/events";
import useWidgets from "@widgets/_actions/hooks/useWidgets";
import { FieldType, WidgetBaseOptions } from "@widgets/_actions/widgetsTypes";
import { Card, Input, InputNumber, Select, Typography } from "antd";
import { FC, useState } from "react";

const { Option } = Select;

const EditorOptions: FC = () => {
    const { currentWidgets } = useWidgets();
    const [selectValue, setSelectValue] = useState("default");

    const handleChange = (value: string, option: WidgetBaseOptions) => {
        setSelectValue(value);
        trigger("updateCurrentWidgetOptions", { value, option });
    };

    const handleInputChange = (value: string, option: WidgetBaseOptions) => {
        setSelectValue(value);
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
                            <Input
                                placeholder={option.displayName}
                                onChange={(event) => handleInputChange(event.target.value, option)}
                            />
                        );
                    }

                    if (option.fieldType === FieldType.Number) {
                        return (
                            <InputNumber
                                placeholder={option.displayName}
                                onChange={(value: string) => handleChange(value, option)}
                            />
                        );
                    }

                    if (option.fieldType === FieldType.Select) {
                        return (
                            <Select
                                defaultValue="default"
                                value={selectValue}
                                onChange={(value: string) => handleChange(value, option)}
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

export default EditorOptions;
