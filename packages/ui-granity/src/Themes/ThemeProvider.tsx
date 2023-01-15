import { HasChildren } from "helpers-granity";
import { FC } from "react";
import { DefaultTheme, ThemeProvider as ThemeProviderLib } from "styled-components";

type Props = HasChildren & {
    theme: DefaultTheme | ((theme: DefaultTheme) => DefaultTheme);
};

const ThemeProvider: FC<Props> = ({ theme, children }) => {
    return <ThemeProviderLib theme={theme}>{children}</ThemeProviderLib>;
};

export default ThemeProvider;
