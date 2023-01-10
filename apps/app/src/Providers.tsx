import "react-toastify/dist/ReactToastify.min.css";

import ToastContainer from "@app/Common/components/Html/Toast/ToastContainer";
import AppProvider from "@app/Core/_actions/_data/providers/AppProvider";
import FeaturesProvider from "@features/Core/_actions/_data/providers/FeaturesProvider";
import ThemeProvider from "@themes/ThemeProvider";
import { HasChildren } from "helpers-granity";
import { FC } from "react";

type Props = HasChildren;

const Providers: FC<Props> = ({ children }) => (
    <>
        <ThemeProvider>
            <AppProvider>
                <FeaturesProvider>
                    <ToastContainer />
                    {children}
                </FeaturesProvider>
            </AppProvider>
        </ThemeProvider>
    </>
);

export default Providers;
