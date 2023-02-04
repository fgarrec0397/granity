import pxToRem from "@granity-ui/Themes/utilities/pxToRem";
import { styled } from "@mui/material";
import TextFieldLib, { TextFieldProps as LibTextFieldProps } from "@mui/material/TextField";
import { FC } from "react";

export type TextFieldProps = LibTextFieldProps;

const StyledTextField = styled(TextFieldLib)`
    .MuiFormLabel-root {
        position: static;
        transform: translate(0) scale(0.75);

        &.Mui-focused {
            color: ${({ theme }) => theme.palette.text.primary};
        }
    }

    .MuiInputBase-root {
        &,
        &:hover {
            background-color: transparent;
        }

        &:before,
        &:after {
            content: none;
        }
    }

    .MuiInputBase-input {
        padding-top: ${pxToRem(7)};
        padding-right: ${pxToRem(12)};
        padding-bottom: ${pxToRem(7)};
        padding-left: ${pxToRem(12)};
        background-color: ${({ theme }) => theme.custom.palette.background.textField};
        border: ${pxToRem(1)} solid ${({ theme }) => theme.custom.palette.background.textField};
        border-radius: ${pxToRem(4)};
        transition: ${({ theme }) =>
            theme.transitions.create(["border-color", "background-color", "box-shadow"])};

        &:not(:disabled):hover {
            background-color: ${({ theme }) => theme.palette.action.hover};
        }

        &:disabled {
            cursor: not-allowed;
        }

        &:focus {
            ${({ theme }) => `
                border-color: ${theme.palette.action.focus};
            `}
        }

        &.MuiInputBase-inputSizeSmall {
            padding-top: ${pxToRem(3)};
            padding-right: ${pxToRem(5)};
            padding-bottom: ${pxToRem(3)};
            padding-left: ${pxToRem(5)};
            font-size: ${pxToRem(12)};
        }
    }

    .MuiMenuItem-root.Mui-selected {
        background-color: ${({ theme }) => theme.palette.action.hover} !important;
    }
    .MuiList-root {
    }
`;

const TextField: FC<TextFieldProps> = ({ children, ...props }) => {
    return <StyledTextField {...props}>{children}</StyledTextField>;
};

export default TextField;
