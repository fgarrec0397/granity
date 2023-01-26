import Core from "@granity-engine/App/Core/Core";
import GlobalStyle from "@granity-engine/Themes/globalStyle";
import { FC } from "react";

export const GranityEngine: FC = () => (
    <>
        <GlobalStyle />
        <Core />
    </>
);
