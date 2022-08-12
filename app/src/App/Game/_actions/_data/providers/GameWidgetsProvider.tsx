import { WidgetObjects } from "@app/Widgets/_actions/widgetsTypes";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

export interface GameWidgetsContextModel {
    widgets: WidgetObjects;
    setWidgets: Dispatch<SetStateAction<WidgetObjects>>;
}

export const gameWidgetsDefaultContext: GameWidgetsContextModel = {
    widgets: {},
    setWidgets: () => {},
};

export const GameWidgetsContext = createContext<GameWidgetsContextModel>(gameWidgetsDefaultContext);

const GameWidgetsContextProvider: FC = ({ children }) => {
    // const providerValue = useWidgetsProviderValue();
    const [widgets, setWidgets] = useState<WidgetObjects>({});

    const providerValue = {
        widgets,
        setWidgets,
    };

    return (
        <GameWidgetsContext.Provider value={providerValue}>{children}</GameWidgetsContext.Provider>
    );
};

export default GameWidgetsContextProvider;
