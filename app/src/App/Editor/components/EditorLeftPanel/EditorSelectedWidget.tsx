import Box from "@app/Common/components/Html/Box/Box";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { FC } from "react";

const EditorSelectedWidget: FC = () => {
    const { selectedWidgets } = useWidgets();
    return (
        <Box>
            {selectedWidgets.length
                ? selectedWidgets[0].widgetDefinition.name
                : "No widget selected"}
        </Box>
    );
};

export default EditorSelectedWidget;
