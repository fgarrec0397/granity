import "react-toastify/dist/ReactToastify.min.css";

import AppProvider from "@app/Core/_actions/_data/providers/AppProvider";
import FeaturesProvider from "@features/Core/_actions/_data/providers/FeaturesProvider";
import { HasChildren } from "helpers-granity";
import { FC } from "react";
import { ThemeProvider, Toaster } from "ui-granity";

import theme from "./Themes/theme";

type Props = HasChildren;

const Providers: FC<Props> = ({ children }) => (
    <>
        <ThemeProvider theme={theme}>
            <AppProvider>
                <FeaturesProvider>
                    <Toaster.ToastContainer />
                    {children}
                </FeaturesProvider>
            </AppProvider>
        </ThemeProvider>
    </>
);

export default Providers;
