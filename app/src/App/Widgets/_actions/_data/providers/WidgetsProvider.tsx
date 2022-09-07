import { WidgetObjects, WidgetSceneObject } from "@app/Widgets/_actions/widgetsTypes";
import { createContext, Dispatch, FC, ReactNode, SetStateAction } from "react";

import { useWidgetsProviderValue } from "../hooks";

export interface WidgetsContextModel {
    widgets: WidgetObjects;
    setWidgets: Dispatch<SetStateAction<WidgetObjects>>;
    selectedWidgets: WidgetSceneObject[];
    setSelectedWidgets: Dispatch<SetStateAction<WidgetSceneObject[]>>;
}

export const widgetsDefaultContext: WidgetsContextModel = {
    widgets: {},
    setWidgets: () => {},
    selectedWidgets: [],
    setSelectedWidgets: () => {},
};

export const WidgetsContext = createContext<WidgetsContextModel>(widgetsDefaultContext);

type Props = {
    children: ReactNode;
};

const WidgetsContextProvider: FC<Props> = ({ children }) => {
    const providerValue = useWidgetsProviderValue();

    return <WidgetsContext.Provider value={providerValue}>{children}</WidgetsContext.Provider>;
};

export default WidgetsContextProvider;
