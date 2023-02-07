import { Box, BoxProps, Typography } from "@granity/ui";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { FC } from "react";

import EditWidgetModal from "../EditorCommon/EditWidgetModal";

type EditorSelectedWidgetStyles = {
    wrapper?: BoxProps;
};

const styles: EditorSelectedWidgetStyles = {
    wrapper: {
        sx: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
    },
};

const EditorSelectedWidget: FC = () => {
    const { displayWidgetName, selectedWidgets } = useWidgets();

    return (
        <Box {...styles.wrapper}>
            {selectedWidgets.length ? (
                <>
                    <Typography>{displayWidgetName(selectedWidgets[0].id)}</Typography>
                    <EditWidgetModal widget={selectedWidgets[0]} />
                </>
            ) : (
                <Typography>No widget selected</Typography>
            )}
        </Box>
    );
};

export default EditorSelectedWidget;
