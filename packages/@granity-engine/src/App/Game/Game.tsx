import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import Widgets from "@granity-engine/App/Widgets/Widgets";
import { FC } from "react";
import { ReactReduxContext } from "react-redux";

import { HistoryDictionaryContext } from "../Editor/_actions/_data/providers/HistoryContextProvider";
import { CamerasContext } from "../Scenes/_actions/_data/providers";
import { WidgetsContext, WidgetsModulesContext } from "../Widgets/_actions/_data/providers";
import GameCanvas from "./Components/GameCanvas";

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
            <GameCanvas contexts={contexts} />
            <GameUI />
        </>
    );
};

export const GameUI: FC = () => {
    const { widgetsUIIds } = useWidgets();

    return <Widgets widgetsIds={widgetsUIIds} />;
};
