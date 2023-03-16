import { Theme } from "@mui/material";
import { ThemeProps } from "@mui/styled-engine-sc";

import pxToRem from "../utilities/pxToRem";

export const inputStyles = () => (props: ThemeProps<Theme>) =>
    `
        .MuiFormLabel-root {
            position: static;
            transform: translate(0) scale(0.75);

            &.Mui-focused {
                color: ${props.theme.palette.text.primary};
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
            background-color: ${props.theme.palette.background.textField};
            border: ${pxToRem(1)} solid ${props.theme.palette.background.textField};
            border-radius: ${pxToRem(4)};
            transition: ${props.theme.transitions.create([
                "border-color",
                "background-color",
                "box-shadow",
            ])};

            &:not(:disabled):hover {
                background-color: ${props.theme.palette.action.hover};
            }

            &:disabled {
                cursor: not-allowed;
            }

            &:focus {
                border-color: ${props.theme.palette.action.focus};
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
            background-color: ${props.theme.palette.action.hover} !important;
        }
        .MuiList-root {
        }
    `;
