import { layoutStyles } from "@engine/Theme/mixins/layout";
import { Box, BoxProps } from "@granity/ui";
import { FC } from "react";

import EditorFilesManager from "./EditorFilesManager";

type EditorBottomPanelStyles = {
    wrapper?: BoxProps;
};

const styles: EditorBottomPanelStyles = {
    wrapper: {
        sx: {
            ...layoutStyles({ bottom: 0 }),
        },
    },
};

const EditorBottomPanel: FC = () => {
    return (
        <Box {...styles.wrapper}>
            <EditorFilesManager />
        </Box>
    );
};

export default EditorBottomPanel;
