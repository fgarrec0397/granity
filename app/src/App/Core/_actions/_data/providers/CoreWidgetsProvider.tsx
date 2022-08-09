import GameWidgetsContextProvider from "@app/Game/_actions/_data/providers/GameWidgetsProvider";
import WidgetsContextProvider from "@app/Widgets/_actions/_data/providers/WidgetsProvider";
import { WidgetObjects } from "@app/Widgets/_actions/widgetsTypes";
import { createContext, Dispatch, FC, SetStateAction } from "react";

const CoreWidgetsContextProvider: FC = ({ children }) => {
    return (
        <WidgetsContextProvider>
            <GameWidgetsContextProvider>{children}</GameWidgetsContextProvider>
        </WidgetsContextProvider>
    );
};

export default CoreWidgetsContextProvider;
