import { Card, Collapse, Descriptions, Input, Select, Typography } from "antd";
import { FC, useState } from "react";
import { css } from "styled-components";
import StyledWrapper, { StyledWrapperProps } from "@common/components/Html/StyledWrapper";
import { trigger } from "@core/utilities/events";
import useWidgets from "@widgets/hooks/useWidgets";
import { FieldType, WidgetBaseOptions } from "@app/Widgets/widgetsTypes";

const { Panel } = Collapse;
const { Option } = Select;

interface EditorFeedbackStyles {
    wrapper?: StyledWrapperProps;
}

const styles: EditorFeedbackStyles = {
    wrapper: {
        css: css`
            margin-right: 0.5em;
            width: 300px;
            user-select: none;
        `,
    },
};

const EditorFeedback: FC = () => {
    const { currentWidgetProperties, currentWidgets } = useWidgets();
    const [selectValue, setSelectValue] = useState("default");

    const handleChange = (value: string, option: WidgetBaseOptions) => {
        setSelectValue(value);
        trigger("updateCurrentWidgetOptions", { value, option });
    };

    if (currentWidgetProperties) {
        return (
            <StyledWrapper {...styles.wrapper}>
                <Collapse defaultActiveKey={["1"]}>
                    <Panel header="WidgetName: Not supported yet" key="1">
                        <Card size="small" bordered={false} bodyStyle={{ padding: "0" }}>
                            <Descriptions>
                                {currentWidgetProperties?.position !== undefined && (
                                    <Descriptions.Item
                                        label="Position"
                                        labelStyle={{
                                            fontWeight: "bold",
                                        }}
                                        contentStyle={{
                                            flexDirection: "column",
                                        }}
                                    >
                                        <span>
                                            <i>X:</i>
                                            {currentWidgetProperties?.position[0].toFixed(3)}
                                        </span>
                                        <span>
                                            <i>Y:</i>
                                            {currentWidgetProperties?.position[1].toFixed(3)}
                                        </span>
                                        <span>
                                            <i>Z:</i>
                                            {currentWidgetProperties?.position[2].toFixed(3)}
                                        </span>
                                    </Descriptions.Item>
                                )}
                            </Descriptions>
                            <Descriptions>
                                {currentWidgetProperties?.rotation !== undefined && (
                                    <Descriptions.Item
                                        label="Rotation"
                                        labelStyle={{
                                            fontWeight: "bold",
                                        }}
                                        contentStyle={{
                                            flexDirection: "column",
                                        }}
                                    >
                                        <span>
                                            <i>X:</i>
                                            {currentWidgetProperties?.rotation[0].toFixed(3)}
                                        </span>
                                        <span>
                                            <i>Y:</i>
                                            {currentWidgetProperties?.rotation[1].toFixed(3)}
                                        </span>
                                        <span>
                                            <i>Z:</i>
                                            {currentWidgetProperties?.rotation[2].toFixed(3)}
                                        </span>
                                    </Descriptions.Item>
                                )}
                            </Descriptions>
                            <Descriptions>
                                {currentWidgetProperties?.scale !== undefined && (
                                    <Descriptions.Item
                                        label="Scale"
                                        labelStyle={{
                                            fontWeight: "bold",
                                        }}
                                        contentStyle={{
                                            flexDirection: "column",
                                        }}
                                    >
                                        <span>
                                            <i>X:</i>
                                            {currentWidgetProperties?.scale[0].toFixed(3)}
                                        </span>
                                        <span>
                                            <i>Y:</i>
                                            {currentWidgetProperties?.scale[1].toFixed(3)}
                                        </span>
                                        <span>
                                            <i>Z:</i>
                                            {currentWidgetProperties?.scale[2].toFixed(3)}
                                        </span>
                                    </Descriptions.Item>
                                )}
                            </Descriptions>
                        </Card>
                    </Panel>
                    <Panel header="Options" key="2">
                        <Card size="small" bordered={false} bodyStyle={{ padding: "0" }}>
                            {currentWidgets.length > 1 ? (
                                <Typography>
                                    Impossible to edit widget while more than one is selected
                                </Typography>
                            ) : (
                                currentWidgets.length > 0 &&
                                currentWidgets[0].widgetDefinition.options?.map((option) => {
                                    if (option.fieldType === FieldType.Text) {
                                        return (
                                            <Input
                                                addonBefore="test"
                                                placeholder="Basic usage"
                                                // value
                                            />
                                        );
                                    }

                                    if (option.fieldType === FieldType.Select) {
                                        return (
                                            <Select
                                                defaultValue="default"
                                                value={selectValue}
                                                onChange={(value: string) =>
                                                    handleChange(value, option)
                                                }
                                            >
                                                <Option value="default" disabled>
                                                    Select an option
                                                </Option>
                                                {option.selectOptions?.map(
                                                    (selectionOption, index) => (
                                                        <Option
                                                            key={index}
                                                            value={selectionOption.value}
                                                        >
                                                            {selectionOption.name}
                                                        </Option>
                                                    )
                                                )}
                                            </Select>
                                        );
                                    }

                                    return null;
                                })
                            )}
                        </Card>
                    </Panel>
                </Collapse>
            </StyledWrapper>
        );
    }

    return null;
};

export default EditorFeedback;
