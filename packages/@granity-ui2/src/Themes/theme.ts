import createTheme from "@mui/material/styles/createTheme";

declare module "@mui/material/styles" {
    interface Theme {
        custom: {
            palette: {
                background: {
                    paperDark?: string;
                };
            };
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        custom?: {
            palette?: {
                background: {
                    paperDark?: string;
                };
            };
        };
    }
}

const theme = createTheme({
    custom: {
        palette: {
            background: {
                paperDark: "#292929",
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
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
        },
    },
    typography: {
        fontFamily: ["DM Sans", "sans-serif"].join(","),
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
