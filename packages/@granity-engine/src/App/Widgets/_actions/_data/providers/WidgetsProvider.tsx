import { WidgetDictionary, WidgetDictionaryItem } from "@granity-engine/App/Widgets/_actions/widgetsTypes";
import { HasChildren } from "@granity/helpers";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

export interface WidgetsContextModel {
    widgets: WidgetDictionary;
    selectedWidgets: WidgetDictionaryItem[];
    setWidgets: Dispatch<SetStateAction<WidgetDictionary>>;
    setSelectedWidgets: Dispatch<SetStateAction<WidgetDictionaryItem[]>>;
}

export const widgetsDefaultContext: WidgetsContextModel = {
    widgets: {},
    selectedWidgets: [],
    setWidgets: () => {},
    setSelectedWidgets: () => {},
};

export const WidgetsContext = createContext<WidgetsContextModel>(widgetsDefaultContext);

type Props = HasChildren;

const WidgetsContextProvider: FC<Props> = ({ children }) => {
    const [widgets, setWidgets] = useState<WidgetDictionary>({});
    const [selectedWidgets, setSelectedWidgets] = useState<WidgetDictionaryItem[]>([]);

    const providerValue: WidgetsContextModel = {
        widgets,
        selectedWidgets,
        setWidgets,
        setSelectedWidgets,
    };

    return <WidgetsContext.Provider value={providerValue}>{children}</WidgetsContext.Provider>;
};

export default WidgetsContextProvider;
