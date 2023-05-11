import useCore from "@engine/App/Core/_actions/hooks/useCore";
import { layoutStyles } from "@engine/Theme/mixins/layout";
import { editorPadding } from "@engine/Theme/themeConstants";
import GranityLogo from "@granity/icons/GranityLogo";
import { Box, BoxProps, LinearProgress, Paper, PaperProps, pxToRem } from "@granity/ui";
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
            justifyContent: "space-between",
            padding: pxToRem(10, 14),
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
            marginRight: pxToRem(-6),
        },
    },
};

const EditorHeader: FC = () => {
    const { appStatus } = useCore();

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
            {appStatus === "loading" && (
                <Box sx={{ width: "100%", position: "absolute", bottom: 0, left: 0, right: 0 }}>
                    <LinearProgress />
                </Box>
            )}
        </Paper>
    );
};

export default EditorHeader;
