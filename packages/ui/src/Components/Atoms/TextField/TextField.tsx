import InputLabelLib, { InputLabelProps as LibInputLabelProps } from "@mui/material/InputLabel";
import { css, styled } from "@mui/material/styles";
import TextFieldLib, { TextFieldProps as LibTextFieldProps } from "@mui/material/TextField";
import { pxToRem } from "@ui/theme";
import { inputStyles } from "@ui/theme/mixins/form";
import { FC } from "react";

export type TextFieldProps = LibTextFieldProps & {
    labelPosition?: "top" | "left";
};
export type InputLabelProps = LibInputLabelProps;

const StyledTextField = styled(({ labelPosition, ...props }: TextFieldProps) => (
    <TextFieldLib {...props} />
))<TextFieldProps>`
    ${inputStyles()}

    ${({ labelPosition }) => {
        if (labelPosition === "left") {
            return css`
                flex-direction: row;
                align-items: center;

                .MuiFormLabel-root {
                    margin-right: ${pxToRem(2)};
                    overflow: visible;
                }
            `;
        }
    }}
`;

const TextField: FC<TextFieldProps> = ({ children, ...props }) => {
    return <StyledTextField {...props}>{children}</StyledTextField>;
};

TextField.displayName = "TextField";

export const InputLabel: FC<InputLabelProps> = ({ children, ...props }) => {
    return <InputLabelLib {...props}>{children}</InputLabelLib>;
};

export default TextField;
