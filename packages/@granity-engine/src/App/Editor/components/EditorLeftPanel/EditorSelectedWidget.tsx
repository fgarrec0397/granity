import { Paper, PaperProps, pxToRem, Typography } from "@granity/ui";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { FC } from "react";

import EditWidgetModal from "../EditorCommon/EditWidgetModal";

type EditorSelectedWidgetStyles = {
    wrapper?: PaperProps;
};

const styles: EditorSelectedWidgetStyles = {
    wrapper: {
        sx: (theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: pxToRem(20, 16),
            backgroundColor: theme.custom.palette.background.paperDarker,
        }),
    },
};

const EditorSelectedWidget: FC = () => {
    const { displayWidgetName, selectedWidgets } = useWidgets();

    return (
        <Paper {...styles.wrapper}>
            {selectedWidgets.length ? (
                <>
                    <Typography>{displayWidgetName(selectedWidgets[0].id)}</Typography>
                    <EditWidgetModal widget={selectedWidgets[0]} />
                </>
            ) : (
                <Typography>No widget selected</Typography>
            )}
        </Paper>
    );
};

export default EditorSelectedWidget;
