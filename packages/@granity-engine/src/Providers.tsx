import { HasChildren } from "@granity/helpers";
import { ThemeProvider, Toaster } from "@granity/ui";
import AppProvider from "@granity-engine/App/Core/_actions/_data/providers/AppProvider";
import { FC } from "react";

import theme from "./Themes/theme";

type Props = HasChildren;

const Providers: FC<Props> = ({ children }) => (
    <ThemeProvider theme={theme}>
        <AppProvider>
            <Toaster.ToastContainer />
            {children}
        </AppProvider>
    </ThemeProvider>
);

export default Providers;
