import { HasChildren } from "@granity/helpers";
import { Theme as ThemeLib, ThemeProvider as ThemeProviderLib } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { FC } from "react";

import appTheme from "./theme";

export type Theme = ThemeLib;

type Props = HasChildren & {
    theme?: Theme;
};

const ThemeProvider: FC<Props> = ({ theme = appTheme, children }) => {
    return (
        <ThemeProviderLib theme={theme}>
            <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
        </ThemeProviderLib>
    );
};

export default ThemeProvider;
