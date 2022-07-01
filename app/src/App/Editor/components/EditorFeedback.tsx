import useWidgets from "@widgets/_actions/hooks/useWidgets";
import { Card, Descriptions } from "antd";
import { FC } from "react";

const EditorFeedback: FC = () => {
    const { currentWidgets, currentWidgetProperties } = useWidgets();

    if (currentWidgets[0] && currentWidgetProperties) {
        return (
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
        );
    }

    return null;
};

export default EditorFeedback;
