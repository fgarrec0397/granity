import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import Widgets from "@granity-engine/App/Widgets/Widgets";
import { FC } from "react";
import { ReactReduxContext } from "react-redux";

import CoreCanvas from "../Core/Components/CoreCanvas";
import { HistoryDictionaryContext } from "../Editor/_actions/_data/providers/HistoryContextProvider";
import { CamerasContext } from "../Scenes/_actions/_data/providers";
import { WidgetsContext, WidgetsModulesContext } from "../Widgets/_actions/_data/providers";

export const Game: FC = () => {
    const contexts = [
        CamerasContext,
        WidgetsContext,
        WidgetsModulesContext,
        ReactReduxContext,
        HistoryDictionaryContext,
    ];

    return (
        <>
            <CoreCanvas contexts={contexts} />
            <GameUI />
        </>
    );
};

export const GameUI: FC = () => {
    const { widgetsUI } = useWidgets();

    return <Widgets widgets={widgetsUI} />;
};
