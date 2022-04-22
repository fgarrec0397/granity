import React, { FC, createContext, useState, Dispatch, SetStateAction } from "react";
import { WidgetSceneObject } from "../types";

export interface WidgetContextModel {
    widgets: WidgetSceneObject[] | [];
    setWidgets: (() => void) | Dispatch<SetStateAction<WidgetSceneObject[]>>;
}

export const defaultContext: WidgetContextModel = {
    widgets: [],
    setWidgets: () => {},
};

export const WidgetsContext = createContext<WidgetContextModel>(defaultContext);

const WidgetsContextProvider: FC = ({ children }) => {
    const [widgets, setWidgets] = useState<WidgetSceneObject[]>([]);

    const providerValue: WidgetContextModel = {
        widgets,
        setWidgets,
    };

    return <WidgetsContext.Provider value={providerValue}>{children}</WidgetsContext.Provider>;
};

export default WidgetsContextProvider;
