import { layoutStyles } from "@engine/Theme/mixins/layout";
import { editorPadding } from "@engine/Theme/themeConstants";
import { Box, BoxProps, GranityLogo, Paper, PaperProps, pxToRem } from "@granity/ui";
import { FC } from "react";

import EditorControls from "../EditorCommon/EditorControls";
import EditorMainMenu from "./EditorMainMenu";
import EditorSettingsMenu from "./EditorSettingsMenu";

type EditorStyles = {
    wrapper?: PaperProps;
    leftSection?: BoxProps;
    centerSection?: BoxProps;
    rightSection?: BoxProps;
};

const styles: EditorStyles = {
    wrapper: {
        sx: {
            ...layoutStyles({
                top: editorPadding,
                width: 280,
                centered: true,
            }),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: pxToRem(10),
            color: "secondary.dark",
        },
    },
    centerSection: {
        sx: {
            display: "flex",
            alignItems: "center",
        },
    },
    leftSection: {
        sx: {
            display: "flex",
            alignItems: "center",
        },
    },
    rightSection: {
        sx: {
            display: "flex",
            alignItems: "center",
        },
    },
};

const EditorHeader: FC = () => {
    return (
        <Paper {...styles.wrapper}>
            <Box {...styles.leftSection}>
                <GranityLogo />
            </Box>
            <Box {...styles.centerSection}>
                <EditorControls />
            </Box>
            <Box {...styles.rightSection}>
                <EditorSettingsMenu />
                <EditorMainMenu />
            </Box>
        </Paper>
    );
};

export default EditorHeader;
