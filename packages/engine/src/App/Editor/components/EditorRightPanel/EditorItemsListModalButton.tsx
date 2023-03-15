import { ButtonBase, ButtonBaseProps, pxToRem } from "@granity/ui";
import { FC } from "react";

export type EditorItemsListModalButtonProps = {
    onClick?: ButtonBaseProps["onClick"];
    buttonText: string;
};

export type EditorItemsListModalButtonStyles = {
    widgetButton?: ButtonBaseProps;
};

const styles: EditorItemsListModalButtonStyles = {
    widgetButton: {
        sx: (theme) => ({
            minHeight: pxToRem(105),
            border: 1,
            fontSize: 20,
            fontWeight: theme.typography.fontWeightMedium,

            "&:hover": {
                backgroundColor: "action.hover",
            },
        }),
    },
};

const EditorItemsListModalButton: FC<EditorItemsListModalButtonProps> = ({
    buttonText,
    onClick,
}) => {
    return (
        <ButtonBase onClick={onClick} {...styles.widgetButton}>
            {buttonText}
        </ButtonBase>
    );
};

export default EditorItemsListModalButton;
