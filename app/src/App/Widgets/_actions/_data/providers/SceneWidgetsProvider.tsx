import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

import { WidgetSceneObjects } from "../../widgetsTypes";

export interface SceneWidgetDefinitionContextModel {
    widgets: WidgetSceneObjects;
    setSceneWidgets: (() => void) | Dispatch<SetStateAction<WidgetSceneObjects>>;
}

export const defaultContext: SceneWidgetDefinitionContextModel = {
    widgets: {},
    setSceneWidgets: () => {},
};

export const SceneWidgetsContext = createContext<SceneWidgetDefinitionContextModel>(defaultContext);

const SceneWidgetsContextProvider: FC = ({ children }) => {
    const [widgets, setSceneWidgets] = useState<WidgetSceneObjects>({});

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
