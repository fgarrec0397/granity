import { HasChildren } from "helpers-granity";
import { FC } from "react";
import { ThemeProvider as ThemeProviderLib } from "styled-components";

import theme from "./theme";

type Props = HasChildren;

const ThemeProvider: FC<Props> = ({ children }) => {
    return <ThemeProviderLib theme={theme}>{children}</ThemeProviderLib>;
};

export default ThemeProvider;
