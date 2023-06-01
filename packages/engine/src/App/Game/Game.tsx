import { FC } from "react";
import { ReactReduxContext } from "react-redux";

import useHandleLoadApp from "../Core/_actions/hooks/useHandleLoadApp";
import { HistoryDictionaryContext } from "../Editor/_actions/_data/providers/HistoryContextProvider";
import { CamerasContext } from "../Scenes/_actions/_data/providers";
import UIWidgets from "../UI/Components/UIWidgets";
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

    useHandleLoadApp();

    return (
        <>
            <GameCanvas contexts={contexts} />
            <GameUI />
        </>
    );
};

export const GameUI: FC = () => {
    return <UIWidgets />;
};
