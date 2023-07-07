import { layoutSectionStyles, layoutStyles } from "@engine/Theme/mixins/layout";
import { editorPadding } from "@engine/Theme/themeConstants";
import { Box, BoxProps, pxToRem } from "@granity/ui";
import { FC } from "react";

import EditorGameWidgetsList from "./EditorGameWidgetsList";
import EditorScenesList from "./EditorScenesList";
import EditorUIWidgetsList from "./EditorUIWidgetsList";

type EditorRightPanelStyles = {
    wrapper?: BoxProps;
    section?: BoxProps;
};

const styles: EditorRightPanelStyles = {
    wrapper: {
        sx: {
            ...layoutStyles({ top: 80, right: editorPadding, width: 275 }),
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

const EditorRightPanel: FC = () => {
    return (
        <Box {...styles.wrapper}>
            <EditorGameWidgetsList />
            <EditorUIWidgetsList />
            <EditorScenesList />
        </Box>
    );
};

export default EditorRightPanel;
