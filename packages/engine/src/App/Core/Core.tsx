import { FC } from "react";
import { ReactReduxContext } from "react-redux";

import { HistoryDictionaryContext } from "../Editor/_actions/_data/providers/HistoryContextProvider";
import { CamerasContext } from "../Scenes/_actions/_data/providers/CamerasContextProvider";
import UI from "../UI/UI";
import { WidgetsContext, WidgetsModulesContext } from "../Widgets/_actions/_data/providers";
import useHandleLoadApp from "./_actions/hooks/useHandleLoadApp";
import CoreCanvas from "./Components/CoreCanvas";

const Core: FC = () => {
    const contexts = [
        CamerasContext,
        WidgetsContext,
        WidgetsModulesContext,
        ReactReduxContext,
        HistoryDictionaryContext,
    ];

    useHandleLoadApp();

    return (
        <>
            <CoreCanvas contexts={contexts} />
            <UI />
        </>
    );
};

export default Core;
