import { CssBaseline, GlobalStyles } from "@granity/ui";
import { FC, lazy, Suspense, useTransition } from "react";

const Core = lazy(() => import("@engine/App/Core/Core"));

export const GranityEngine: FC = () => {
    const [, startTransition] = useTransition();
    return (
        <>
            <Suspense fallback={<>Loading...</>}>
                <CssBaseline />
                <GlobalStyles
                    styles={{
                        "& #root": {
                            height: "100vh",
                        },
                    }}
                />
                <Core />
            </Suspense>
        </>
    );
};
