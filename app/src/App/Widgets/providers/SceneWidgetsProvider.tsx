import React, { FC, createContext, useState, Dispatch, SetStateAction } from "react";
import { WidgetSceneObject } from "../types";

export interface SceneWidgetContextModel {
    widgets: WidgetSceneObject[] | [];
    setSceneWidgets: (() => void) | Dispatch<SetStateAction<WidgetSceneObject[]>>;
}

export const defaultContext: SceneWidgetContextModel = {
    widgets: [],
    setSceneWidgets: () => {},
};

export const SceneWidgetsContext = createContext<SceneWidgetContextModel>(defaultContext);

const SceneWidgetsContextProvider: FC = ({ children }) => {
    const [widgets, setSceneWidgets] = useState<WidgetSceneObject[]>([]);

    const providerValue: SceneWidgetContextModel = {
        widgets,
        setSceneWidgets,
    };

    return (
        <SceneWidgetsContext.Provider value={providerValue}>
            {children}
        </SceneWidgetsContext.Provider>
    );
};

export default SceneWidgetsContextProvider;
