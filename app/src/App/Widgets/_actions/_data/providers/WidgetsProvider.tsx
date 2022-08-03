import { WidgetObjects } from "@app/Widgets/_actions/widgetsTypes";
import { createContext, Dispatch, FC, SetStateAction } from "react";

import { useWidgetsProviderValue } from "../hooks";

export interface WidgetsContextModel {
    widgets: WidgetObjects;
    setWidgets: (() => void) | Dispatch<SetStateAction<WidgetObjects>>;
}

export const widgetsDefaultContext: WidgetsContextModel = {
    widgets: {},
    setWidgets: () => {},
};

export const WidgetsContext = createContext<WidgetsContextModel>(widgetsDefaultContext);

const WidgetsContextProvider: FC = ({ children }) => {
    const providerValue = useWidgetsProviderValue();

    return <WidgetsContext.Provider value={providerValue}>{children}</WidgetsContext.Provider>;
};

export default WidgetsContextProvider;
