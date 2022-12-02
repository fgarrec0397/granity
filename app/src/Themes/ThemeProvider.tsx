import { FC, ReactNode } from "react";
import { ThemeProvider as ThemeProviderLib } from "styled-components";

import theme from "./theme";

type Props = {
    children: ReactNode;
};

const ThemeProvider: FC<Props> = ({ children }) => {
    return <ThemeProviderLib theme={theme}>{children}</ThemeProviderLib>;
};

export default ThemeProvider;
