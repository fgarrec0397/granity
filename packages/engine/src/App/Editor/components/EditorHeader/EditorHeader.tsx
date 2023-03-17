import { layoutStyles } from "@engine/Theme/mixins/layout";
import { editorPadding } from "@engine/Theme/themeConstants";
import { Box, BoxProps, GranityLogo, Paper, PaperProps, pxToRem } from "@granity/ui";
import { FC } from "react";

import EditorPlayButton from "./EditorPlayButton";
import EditorPreviewButton from "./EditorPreviewButton";
import EditorPreviewUIButton from "./EditorPreviewUIButton";
import EditorSettingsButton from "./EditorSettingsButton";

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
                <EditorPreviewUIButton />
                <EditorPlayButton />
                <EditorPreviewButton />
            </Box>
            <Box {...styles.rightSection}>
                <EditorSettingsButton />
            </Box>
        </Paper>
    );
};

export default EditorHeader;
