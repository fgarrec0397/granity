import InputLib, { InputProps as LibInputProps } from "@mui/material/Input";
import { FC } from "react";

export type InputProps = LibInputProps;

const Input: FC<InputProps> = (props) => {
    return <InputLib {...props} />;
};

export default Input;
