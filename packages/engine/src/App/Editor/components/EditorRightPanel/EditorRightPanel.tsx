import { layoutSectionStyles, layoutStyles } from "@engine/Theme/mixins/layout";
import { editorPadding } from "@engine/Theme/themeConstants";
import { Box, BoxProps, pxToRem } from "@granity/ui";
import { FC } from "react";

import EditorScenesList from "./EditorScenesList";
import EditorWidgetsObjectList from "./EditorWidgetsObjectList";
import EditorWidgetsUIList from "./EditorWidgetsUIList";

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
            <EditorWidgetsObjectList />
            <EditorWidgetsUIList />
            <EditorScenesList />
        </Box>
    );
};

export default EditorRightPanel;