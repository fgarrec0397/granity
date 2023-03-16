import { layoutSectionStyles, layoutStyles } from "@engine/Theme/mixins/layout";
import { editorPadding } from "@engine/Theme/themeConstants";
import { Box, BoxProps, pxToRem } from "@granity/ui";
import { FC } from "react";

import EditorModeSelector from "./EditorModeSelector";
import EditorSelectedWidget from "./EditorSelectedWidget";
import EditorWidgetOptions from "./EditorWidgetOptions/EditorWidgetOptions";
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
                <EditorWidgetOptions />
            </Box>
        </Box>
    );
};

export default EditorLeftPanel;
