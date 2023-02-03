import TextFieldLib, { TextFieldProps as LibTextFieldProps } from "@mui/material/TextField";
import { FC } from "react";

export type TextFieldProps = LibTextFieldProps;

const Button: FC<TextFieldProps> = ({ children, ...props }) => {
    return <TextFieldLib {...props} />;
};

export default Button;
