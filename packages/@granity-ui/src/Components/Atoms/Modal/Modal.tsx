import ModalLib, { ModalProps as LibModalProps } from "@mui/material/Modal";
import { FC } from "react";

export type ModalProps = LibModalProps;

const Modal: FC<ModalProps> = ({ children, ...props }) => {
    return <ModalLib {...props}>{children}</ModalLib>;
};

export default Modal;
