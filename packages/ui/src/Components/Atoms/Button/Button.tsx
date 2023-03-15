import ButtonLib, { ButtonProps as LibButtonProps } from "@mui/material/Button";
import ButtonBaseLib, { ButtonBaseProps as LibButtonBaseProps } from "@mui/material/ButtonBase";
import { FC } from "react";

export type ButtonProps = LibButtonProps;
export type ButtonBaseProps = LibButtonBaseProps;

const Button: FC<ButtonProps> = ({ children, ...props }) => {
    return <ButtonLib {...props}>{children}</ButtonLib>;
};

export const ButtonBase: FC<ButtonBaseProps> = ({ children, ...props }) => {
    return <ButtonBaseLib {...props}>{children}</ButtonBaseLib>;
};

export type { IconButtonProps } from "@mui/material/IconButton";
export { default as IconButton } from "@mui/material/IconButton";

export default Button;
