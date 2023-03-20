import { CssBaseline, GlobalStyles } from "@granity/ui";
import { FC } from "react";

import Core from "./App/Core/Core";

export const GranityEngine: FC = () => {
    return (
        <>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    "& #root": {
                        height: "100vh",
                    },
                }}
            />
            <Core />
        </>
    );
};
