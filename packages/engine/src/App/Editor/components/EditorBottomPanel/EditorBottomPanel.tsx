import { layoutStyles } from "@engine/Theme/mixins/layout";
import KeyboardDoubleArrowUp from "@granity/icons/KeyboardDoubleArrowUp";
import { Box, BoxProps, ButtonBase, ButtonBaseProps, pxToRem } from "@granity/ui";
import { FC, useState } from "react";

import EditorFilesManager from "../EditorCommon/EditorFilesManager";

type EditorBottomPanelStyles = {
    wrapper?: BoxProps;
    button?: ButtonBaseProps;
};

const styles: EditorBottomPanelStyles = {
    wrapper: {
        sx: {
            ...layoutStyles({ bottom: 0 }),
        },
    },
    button: {
        sx: {
            width: "100%",
            minHeight: pxToRem(90),
            background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.404511) 130.67%, #000 192%)",
            opacity: 0.5,
            transition: "opacity .3s ease-in",
            "&:hover": {
                opacity: 1,
            },
        },
    },
};

const EditorBottomPanel: FC = () => {
    const [isFileManagerOpen, setIsFileManagerOpen] = useState(false);

    const openFilesManager = () => setIsFileManagerOpen(true);
    const closeFilesManager = () => setIsFileManagerOpen(false);

    const onClick = () => {
        openFilesManager();
    };

    return (
        <Box {...styles.wrapper}>
            <EditorFilesManager isOpen={isFileManagerOpen} onClose={closeFilesManager} />
            <ButtonBase onClick={onClick} {...styles.button}>
                <KeyboardDoubleArrowUp fontSize="large" />
            </ButtonBase>
        </Box>
    );
};

export default EditorBottomPanel;
