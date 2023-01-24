import Core from "@granity-engine/App/Core/Core";
import GlobalStyle from "@granity-engine/Themes/globalStyle";
import { FC } from "react";

import Providers from "./Providers";

export const GranityEngine: FC = () => (
    <Providers>
        <GlobalStyle />
        <Core />
    </Providers>
);
