import { CssBaseline, GlobalStyles } from "@granity/ui";
import { FC, lazy, Suspense } from "react";

const Core = lazy(() => import("@engine/App/Core/Core"));

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
        <Suspense fallback={<>Loading...</>}>
            <Core />
        </Suspense>
    </>
);
