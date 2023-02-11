import { HasCallableChildren } from "@granity/helpers";
import {
    Button,
    ButtonProps,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@granity/ui";
import { FC, useState } from "react";

export type EditorModalButtonProps = {
    text: string;
    callback?: () => void;
};

export type EditorModalProps = {
    title: string;
    open?: boolean;
    onClose?: () => void;
    acceptButton?: EditorModalButtonProps;
    cancelButton?: EditorModalButtonProps;
} & HasCallableChildren<{
    handleClose: () => void;
    handleOpen: () => void;
}>;

type EditorModalStyles = {
    acceptButton?: ButtonProps;
    cancelButton?: ButtonProps;
};

const styles: EditorModalStyles = {
    acceptButton: {
        size: "large",
    },
    cancelButton: {
        variant: "outlined",
        color: "secondary",
        size: "large",
    },
};

const EditorModal: FC<EditorModalProps> = ({
    title,
    open = false,
    onClose,
    acceptButton,
    cancelButton,
    children,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => {
        onClose?.();
        setIsModalOpen(false);
    };

    const handleAccept = () => {
        acceptButton?.callback?.();
        handleClose();
    };

    const handleCancel = () => {
        cancelButton?.callback?.();
        handleClose();
    };

    return (
        <Dialog
            open={isModalOpen || open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {children({
                    handleOpen,
                    handleClose,
                })}
            </DialogContent>
            <DialogActions>
                {acceptButton && (
                    <Button onClick={handleAccept} {...styles.acceptButton}>
                        {acceptButton.text}
                    </Button>
                )}
                {cancelButton && (
                    <Button onClick={handleCancel} autoFocus {...styles.cancelButton}>
                        {cancelButton.text}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default EditorModal;
