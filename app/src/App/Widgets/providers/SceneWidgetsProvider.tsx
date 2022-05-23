import { createContext, Dispatch, FC, SetStateAction, useState } from "react";
import { WidgetSceneObject } from "../types";

export interface SceneWidgetDefinitionContextModel {
    widgets: WidgetSceneObject[] | [];
    setSceneWidgets: (() => void) | Dispatch<SetStateAction<WidgetSceneObject[]>>;
}

export const defaultContext: SceneWidgetDefinitionContextModel = {
    widgets: [],
    setSceneWidgets: () => {},
};

export const SceneWidgetsContext = createContext<SceneWidgetDefinitionContextModel>(defaultContext);

const SceneWidgetsContextProvider: FC = ({ children }) => {
    const [widgets, setSceneWidgets] = useState<WidgetSceneObject[]>([]);

    const providerValue: SceneWidgetDefinitionContextModel = {
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
