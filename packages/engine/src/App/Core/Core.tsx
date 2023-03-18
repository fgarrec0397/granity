import { FC, lazy, Suspense } from "react";
import { ReactReduxContext } from "react-redux";

import { HistoryDictionaryContext } from "../Editor/_actions/_data/providers/HistoryContextProvider";
import { CamerasContext } from "../Scenes/_actions/_data/providers/CamerasContextProvider";
import { WidgetsContext, WidgetsModulesContext } from "../Widgets/_actions/_data/providers";

const CoreCanvas = lazy(() => import("./Components/CoreCanvas"));
const UI = lazy(() => import("../UI/UI"));

const Core: FC = () => {
    const contexts = [
        CamerasContext,
        WidgetsContext,
        WidgetsModulesContext,
        ReactReduxContext,
        HistoryDictionaryContext,
    ];

    return (
        <Suspense fallback={<>loading...</>}>
            <CoreCanvas contexts={contexts} />
            <UI />
        </Suspense>
    );
};

export default Core;
