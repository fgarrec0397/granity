import { HasChildren } from "@granity/helpers";
import { Theme, ThemeProvider as ThemeProviderLib } from "@mui/material";
import { FC } from "react";

import appTheme from "./theme";

type Props = HasChildren & {
    theme?: Theme;
};

const ThemeProvider: FC<Props> = ({ theme = appTheme, children }) => {
    return <ThemeProviderLib theme={theme}>{children}</ThemeProviderLib>;
};

export default ThemeProvider;
