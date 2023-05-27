import { layoutSectionStyles, layoutStyles } from "@engine/Theme/mixins/layout";
import { editorPadding } from "@engine/Theme/themeConstants";
import { Box, BoxProps, pxToRem } from "@granity/ui";
import { FC } from "react";

import EditorGameWidgetOptions from "./EditorGameWidgetOptions/EditorWidgetOptions";
import EditorModeSelector from "./EditorModeSelector";
import EditorSelectedWidget from "./EditorSelectedWidget";
import EditorWidgetProperties from "./EditorWidgetProperties";

type EditorLeftPanelStyles = {
    wrapper: BoxProps;
    section: BoxProps;
};

const styles: EditorLeftPanelStyles = {
    wrapper: {
        sx: {
            ...layoutStyles({ top: 80, left: editorPadding, width: 280 }),
        },
    },
    section: {
        sx: {
            ...layoutSectionStyles(),
            marginBottom: pxToRem(15),
            "&:last-child": {
                marginBottom: 0,
            },
        },
    },
};

const EditorLeftPanel: FC = () => {
    return (
        <Box {...styles.wrapper}>
            <Box {...styles.section}>
                <EditorSelectedWidget />
            </Box>
            <Box {...styles.section}>
                <EditorModeSelector />
                <EditorWidgetProperties />
                <EditorGameWidgetOptions />
            </Box>
        </Box>
    );
};

export default EditorLeftPanel;
