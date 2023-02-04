import Button, { ButtonProps } from "@mui/material/Button";
import { FC } from "react";

const Button2: FC<ButtonProps> = ({ children, ...props }) => {
    return <Button {...props}>{children}</Button>;
};

export default Button2;
