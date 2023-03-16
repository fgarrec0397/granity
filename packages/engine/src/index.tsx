import Core from "@engine/App/Core/Core";
import { CssBaseline, GlobalStyles } from "@granity/ui";
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
