import { css } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";

import { ThemedFlattenInterpolation } from "./types";

declare module "@mui/material/styles" {
    interface Theme {
        custom: {
            mixins: {
                inputStyles: () => ThemedFlattenInterpolation;
            };
            layout: {
                pxToRem: (size: number) => string;
            };
            palette: {
                background: {
                    paperDark?: string;
                    textField?: string;
                };
            };
        };
    }

    interface ThemeOptions {
        custom?: {
            mixins?: {
                inputStyles?: () => ThemedFlattenInterpolation;
            };
            layout?: {
                pxToRem: (size: number) => string;
            };
            palette?: {
                background: {
                    paperDark?: string;
                    textField?: string;
                };
            };
        };
    }
}

export const htmlFontSize = 16;

const theme = createTheme({
    custom: {
        mixins: {
            inputStyles: () => css``,
        },
        layout: {
            pxToRem: (size) => `${size / htmlFontSize}rem`,
        },
        palette: {
            background: {
                paperDark: "#292929",
                textField: "#454545",
            },
        },
    },
    palette: {
        mode: "dark",
        primary: {
            main: "#9D00FF",
            light: "#BD85E0",
            dark: "#8501D7",
        },
        secondary: {
            main: "#fff",
            light: "#fff",
            dark: "#A5A5A5",
        },
        background: {
            paper: "#323232",
            default: "#323232",
        },
        divider: "#555555",
        action: {
            hover: "#454545",
            focus: "#1976d2",
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    paddingTop: 0,
                    paddingBottom: 0,
                },
            },
        },
        MuiSelect: {
            defaultProps: {
                variant: "filled",
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: "filled",
            },
        },
    },
    typography: {
        fontFamily: ["DM Sans", "sans-serif"].join(","),
        fontSize: 12,
        body1: {
            letterSpacing: "1px",
        },
        body2: {
            letterSpacing: "1px",
        },
        button: {
            fontWeight: "bold",
            textTransform: "initial",
        },
    },
});

export default theme;
