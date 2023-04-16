import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@ui/components/atoms";
import { ChangeEvent, FC, FormEvent } from "react";

export type FileManagerFormModalProps = {
    title: string;
    buttonText: string;
    value: string;
    isModalOpen: boolean;
    onClose?: () => void;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FileManagerFormModal: FC<FileManagerFormModalProps> = ({
    title,
    buttonText,
    value,
    isModalOpen,
    onClose,
    onSubmit,
    onChange,
}) => {
    return (
        <Dialog open={isModalOpen} onClose={onClose}>
            <form onSubmit={onSubmit}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <TextField onChange={onChange} value={value} />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">{buttonText}</Button>
                    <Button color="secondary" variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default FileManagerFormModal;
