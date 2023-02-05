import { inputStyles } from "@granity-ui/Theme/mixins/form";
import { styled } from "@mui/material";
import TextFieldLib, { TextFieldProps as LibTextFieldProps } from "@mui/material/TextField";
import { FC } from "react";

export type TextFieldProps = LibTextFieldProps;

const StyledTextField = styled(TextFieldLib)`
    ${inputStyles()}
`;

const TextField: FC<TextFieldProps> = ({ children, ...props }) => {
    return <StyledTextField {...props}>{children}</StyledTextField>;
};

export default TextField;
