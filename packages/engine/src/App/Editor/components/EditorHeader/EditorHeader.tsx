import { Box, BoxProps, Icons, Paper, PaperProps, pxToRem } from "@granity/ui";
import { GranityLogo } from "@engine/Theme/components/Icons";
import { layoutStyles } from "@engine/Theme/mixins/layout";
import { editorPadding } from "@engine/Theme/themeConstants";
import { FC } from "react";

import EditorPlayButton from "./EditorPlayButton";
import EditorPreviewButton from "./EditorPreviewButton";
import EditorPreviewUIButton from "./EditorPreviewUIButton";

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
            justifyContent: "space-between",
            padding: pxToRem(10, 30),
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
                <Icons.Settings />
            </Box>
        </Paper>
    );
};

export default EditorHeader;
