import { WidgetSceneObject } from "@app/Widgets/_actions/widgetsTypes";
import useWidgets from "@widgets/_actions/hooks/useWidgets";
import { Button, Card, List } from "antd";
import { FC } from "react";

const EditorItemsList: FC = () => {
    const { widgets, selectWidget, selectedWidgets } = useWidgets();

    const handleSelect = (widget: WidgetSceneObject) => {
        selectWidget([widget]);
    };

    return (
        <Card size="small" title="Elements on scene">
            <List
                size="small"
                bordered
                dataSource={Object.keys(widgets)}
                renderItem={(widgetId) => (
                    <List.Item>
                        <Button
                            onClick={() => handleSelect(widgets[widgetId])}
                            disabled={widgets[widgetId]?.id === selectedWidgets[0]?.id}
                        >
                            {widgets[widgetId].widgetDefinition.name}
                        </Button>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default EditorItemsList;
