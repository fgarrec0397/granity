import { Box, BoxProps, pxToRem } from "@granity/ui";
import { layoutSectionStyles, layoutStyles } from "@granity-engine/Theme/mixins/layout";
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
            ...layoutStyles({ top: 110, right: 30 }),
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
            <Box {...styles.section}>
                <EditorWidgetsObjectList />
            </Box>
            <Box {...styles.section}>
                <EditorWidgetsUIList />
            </Box>
            <Box {...styles.section}>
                <EditorScenesList />
            </Box>
        </Box>
    );
};

export default EditorRightPanel;
