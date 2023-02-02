import createTheme from "@mui/material/styles/createTheme";

declare module "@mui/material/styles" {
    interface Theme {
        status: {
            danger: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}

const theme = createTheme({
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
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
        },
    },
    typography: {
        button: {
            fontWeight: "bold",
            textTransform: "initial",
        },
    },
});

export default theme;
