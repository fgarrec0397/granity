import { CssBaseline, GlobalStyles } from "@granity/ui";
import Core from "@granity-engine/App/Core/Core";
import { FC } from "react";

export const GranityEngine: FC = () => (
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
