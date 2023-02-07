import { inputStyles } from "@granity-ui/Theme/mixins/form";
import { styled } from "@mui/material";
import InputLabelLib, { InputLabelProps as LibInputLabelProps } from "@mui/material/InputLabel";
import TextFieldLib, { TextFieldProps as LibTextFieldProps } from "@mui/material/TextField";
import { FC } from "react";

export type TextFieldProps = LibTextFieldProps;
export type InputLabelProps = LibInputLabelProps;

const StyledTextField = styled(TextFieldLib)`
    ${inputStyles()}
`;

const TextField: FC<TextFieldProps> = ({ children, ...props }) => {
    return <StyledTextField {...props}>{children}</StyledTextField>;
};

export const InputLabel: FC<InputLabelProps> = ({ children, ...props }) => {
    return <InputLabelLib {...props}>{children}</InputLabelLib>;
};

export default TextField;
