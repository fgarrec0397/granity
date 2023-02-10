import DialogLib, { DialogProps as LibDialogProps } from "@mui/material/Dialog";
import DialogActionsLib, {
    DialogActionsProps as LibDialogActionsProps,
} from "@mui/material/DialogActions";
import DialogContentLib, {
    DialogContentProps as LibDialogContentProps,
} from "@mui/material/DialogContent";
import DialogTitleLib, { DialogTitleProps as LibDialogTitleProps } from "@mui/material/DialogTitle";
import { FC } from "react";

export type DialogProps = LibDialogProps;
export type DialogActionsProps = LibDialogActionsProps;
export type DialogContentProps = LibDialogContentProps;
export type DialogTitleProps = LibDialogTitleProps;

const Dialog: FC<DialogProps> = ({ children, ...props }) => {
    return <DialogLib {...props}>{children}</DialogLib>;
};

export const DialogActions: FC<DialogActionsProps> = ({ children, ...props }) => {
    return <DialogActionsLib {...props}>{children}</DialogActionsLib>;
};

export const DialogContent: FC<DialogContentProps> = ({ children, ...props }) => {
    return <DialogContentLib {...props}>{children}</DialogContentLib>;
};

export const DialogTitle: FC<DialogTitleProps> = ({ children, ...props }) => {
    return <DialogTitleLib {...props}>{children}</DialogTitleLib>;
};

export default Dialog;
