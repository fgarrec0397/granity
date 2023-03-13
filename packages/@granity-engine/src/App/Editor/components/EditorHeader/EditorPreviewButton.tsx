import { Preview } from "@granity/engine/Theme/components/Icons";
import { IconButton, IconButtonProps, pxToRem } from "@granity/ui";
import { FC } from "react";

export type EditorSettingsButtonStyles = {
    button?: IconButtonProps;
};

const styles: EditorSettingsButtonStyles = {
    button: {
        sx: {
            padding: pxToRem(4),
            color: "secondary.dark",
        },
    },
};

const EditorSettingsButton: FC = () => {
    const onClickPreviewUIHandler = () => {
        console.log("preview");
    };

    return (
        <IconButton onClick={onClickPreviewUIHandler} {...styles.button}>
            <Preview />
        </IconButton>
    );
};

export default EditorSettingsButton;
