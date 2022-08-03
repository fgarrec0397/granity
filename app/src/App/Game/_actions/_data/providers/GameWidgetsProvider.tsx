import useWidgetsProviderValue from "@app/Widgets/_actions/_data/hooks/useWidgetsProviderValue";
import {
    WidgetsContextModel,
    widgetsDefaultContext,
} from "@app/Widgets/_actions/_data/providers/WidgetsProvider";
import { createContext, FC } from "react";

export const GameWidgetsContext = createContext<WidgetsContextModel>(widgetsDefaultContext);

const GameWidgetsContextProvider: FC = ({ children }) => {
    const providerValue = useWidgetsProviderValue();

    return (
        <GameWidgetsContext.Provider value={providerValue}>{children}</GameWidgetsContext.Provider>
    );
};

export default GameWidgetsContextProvider;
