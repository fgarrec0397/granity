import Core from "@granity-engine/App/Core/Core";
import GlobalStyle from "@granity-engine/Themes/globalStyle";
import { FC, StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Providers from "./Providers";

const container = document.getElementById("root") as Element | DocumentFragment;

const root = createRoot(container);

export const GranityEngine: FC = () => (
    <Providers>
        <GlobalStyle />
        <Core />
    </Providers>
);

root.render(
    <StrictMode>
        <GranityEngine />
    </StrictMode>
);
