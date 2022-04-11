import React, { FC, createContext, useState, Dispatch, SetStateAction } from "react";
import { IWidget } from "../../Widgets/types";

export interface WidgetContextModel {
    widgets: IWidget[] | [];
    setWidgets: (() => void) | Dispatch<SetStateAction<IWidget[]>>;
}

export const defaultContext: WidgetContextModel = {
    widgets: [],
    setWidgets: () => {},
};

export const WidgetsContext = createContext<WidgetContextModel>(defaultContext);

const WidgetsContextProvider: FC = ({ children }) => {
    const [widgets, setWidgets] = useState<IWidget[]>([]);

    const providerValue: WidgetContextModel = {
        widgets,
        setWidgets,
    };

    return <WidgetsContext.Provider value={providerValue}>{children}</WidgetsContext.Provider>;
};

export default WidgetsContextProvider;
