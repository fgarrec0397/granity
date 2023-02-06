import { Box, BoxProps, pxToRem } from "@granity/ui";
import { GranityLogo } from "@granity-engine/Theme/components/Icons";
import { layoutStyles } from "@granity-engine/Theme/mixins/layout";
import { FC } from "react";

import EditorPlayButton, { EditorPlayIconButtonProps } from "./EditorPlayButton";
import EditorPreviewUIButton, { EditorPreviewUIButtonProps } from "./EditorPreviewUIButton";

type EditorStyles = {
    wrapper?: BoxProps;
    leftSection?: BoxProps;
    centerSection?: BoxProps;
    rightSection?: BoxProps;
    uiPreviewButton?: EditorPreviewUIButtonProps;
    playButton?: EditorPlayIconButtonProps;
};

const styles: EditorStyles = {
    wrapper: {
        sx: {
            ...layoutStyles(
                {
                    top: 0,
                    right: 0,
                    left: 0,
                },
                false
            ),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: pxToRem(10, 30),
            backdropFilter: "light",
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
    playButton: {
        styles: {
            button: {
                sx: {
                    marginLeft: pxToRem(25),
                },
            },
        },
    },
};

const EditorHeader: FC = () => {
    return (
        <Box {...styles.wrapper}>
            <Box {...styles.leftSection}>
                <GranityLogo />
            </Box>
            <Box {...styles.centerSection}>
                <EditorPreviewUIButton {...styles.uiPreviewButton} />
                <EditorPlayButton {...styles.playButton} />
            </Box>
            <Box {...styles.rightSection}>Menu</Box>
        </Box>
    );
};

export default EditorHeader;
