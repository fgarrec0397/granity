import { Paper, PaperProps, pxToRem, Typography, TypographyProps } from "@granity/ui";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { FC } from "react";

import EditWidgetModal from "../EditorCommon/EditWidgetModal";

type EditorSelectedWidgetStyles = {
    wrapper?: PaperProps;
    text?: TypographyProps;
};

const styles: EditorSelectedWidgetStyles = {
    wrapper: {
        sx: (theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: pxToRem(80),
            padding: pxToRem(20, 16),
            backgroundColor: theme.palette.background.paperDarker,
        }),
    },
    text: {
        noWrap: true,
        sx: (theme) => ({
            fontSize: pxToRem(16),
            fontWeight: theme.typography.fontWeightMedium,
        }),
    },
};

const EditorSelectedWidget: FC = () => {
    const { displayWidgetName, selectedWidgets } = useWidgets();

    return (
        <Paper {...styles.wrapper}>
            {selectedWidgets.length ? (
                <>
                    <Typography {...styles.text}>
                        {displayWidgetName(selectedWidgets[0].id)}
                    </Typography>
                    <EditWidgetModal widget={selectedWidgets[0]} iconSize="medium" />
                </>
            ) : (
                <Typography {...styles.text}>No widget selected</Typography>
            )}
        </Paper>
    );
};

export default EditorSelectedWidget;
