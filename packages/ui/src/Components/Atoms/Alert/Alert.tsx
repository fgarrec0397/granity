import AlertLib, { AlertProps as LibAlertProps } from "@mui/material/Alert";
import { FC } from "react";

export type AlertProps = LibAlertProps;

const Alert: FC<AlertProps> = ({ children, ...props }) => {
    return <AlertLib {...props}>{children}</AlertLib>;
};

export default Alert;
