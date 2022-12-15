import { HasChildren } from "@app/Common/commonTypes";
import AppProvider from "@app/Core/_actions/_data/providers/AppProvider";
import FeaturesProvider from "@features/Core/_actions/_data/providers/FeaturesProvider";
import ThemeProvider from "@themes/ThemeProvider";
import { FC } from "react";

type Props = HasChildren;

const Providers: FC<Props> = ({ children }) => (
    <>
        <ThemeProvider>
            <AppProvider>
                <FeaturesProvider>{children}</FeaturesProvider>
            </AppProvider>
        </ThemeProvider>
    </>
);

export default Providers;
