import { Box, BoxProps, pxToRem } from "@granity/ui";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { layoutSectionStyles, layoutStyles } from "@granity-engine/Theme/mixins/layout";
import { FC } from "react";

import EditorModeSelector from "./EditorModeSelector";
import EditorSelectedWidget from "./EditorSelectedWidget";
import EditorWidgetOptions from "./EditorWidgetOptions/EditorWidgetOptions";
import EditorWidgetProperties from "./EditorWidgetProperties/EditorWidgetProperties";

type EditorLeftPanelStyles = {
    wrapper: BoxProps;
    section: BoxProps;
};

const styles: EditorLeftPanelStyles = {
    wrapper: {
        sx: {
            ...layoutStyles({ top: 110, left: 30 }),
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
    const { selectedWidgets } = useWidgets();

    return (
        <Box {...styles.wrapper}>
            <Box {...styles.section}>
                <EditorSelectedWidget />
            </Box>
            <Box {...styles.section}>
                <EditorModeSelector />
            </Box>
            <Box {...styles.section}>
                <EditorWidgetProperties />
            </Box>
            {selectedWidgets[0] && (
                <Box {...styles.section}>
                    <EditorWidgetOptions />
                </Box>
            )}
        </Box>
    );
};

export default EditorLeftPanel;
