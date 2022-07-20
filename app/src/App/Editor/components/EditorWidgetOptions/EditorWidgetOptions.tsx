import Typography from "@app/Common/components/Html/Typography";
import useWidgets from "@widgets/_actions/hooks/useWidgets";
import { FieldType } from "@widgets/_actions/widgetsTypes";
import { Card } from "antd";
import { FC } from "react";

import EditorOptionsNumberField from "./EditorOptionsNumberField";
import EditorOptionsSelectField from "./EditorOptionsSelectField";
import EditorOptionsTextField from "./EditorOptionsTextField";

const EditorWidgetOptions: FC = () => {
    const { currentWidgets } = useWidgets();

    return (
        <Card size="small" bordered={false} bodyStyle={{ padding: "0" }}>
            {currentWidgets.length > 1 ? (
                <Typography>Impossible to edit widget while more than one is selected</Typography>
            ) : (
                currentWidgets.length > 0 &&
                currentWidgets[0].widgetDefinition.options?.map((option) => {
                    if (option.fieldType === FieldType.Text) {
                        return <EditorOptionsTextField option={option} />;
                    }

                    if (option.fieldType === FieldType.Number) {
                        return <EditorOptionsNumberField option={option} />;
                    }

                    if (option.fieldType === FieldType.Select) {
                        return <EditorOptionsSelectField option={option} />;
                    }

                    return null;
                })
            )}
        </Card>
    );
};

export default EditorWidgetOptions;
