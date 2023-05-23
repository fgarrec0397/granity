import {
    WidgetDictionary,
    WidgetDictionaryItem,
} from "@engine/App/Widgets/_actions/widgetsTypes";
import { HasChildren } from "@granity/helpers";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

export interface WidgetsContextModel {
    widgets: WidgetDictionary;
    widgetsIds: string[];
    selectedWidgets: WidgetDictionaryItem[];
    setWidgetsIds: Dispatch<SetStateAction<string[]>>;
    setWidgets: Dispatch<SetStateAction<WidgetDictionary>>;
    setSelectedWidgets: Dispatch<SetStateAction<WidgetDictionaryItem[]>>;
}

export const widgetsDefaultContext: WidgetsContextModel = {
    widgets: {},
    widgetsIds: [],
    selectedWidgets: [],
    setWidgets: () => {},
    setWidgetsIds: () => {},
    setSelectedWidgets: () => {},
};

export const WidgetsContext = createContext<WidgetsContextModel>(widgetsDefaultContext);

type Props = HasChildren;

const WidgetsContextProvider: FC<Props> = ({ children }) => {
    const [widgets, setWidgets] = useState<WidgetDictionary>({});
    const [widgetsIds, setWidgetsIds] = useState<string[]>([]);
    const [selectedWidgets, setSelectedWidgets] = useState<WidgetDictionaryItem[]>([]);

    const providerValue: WidgetsContextModel = {
        widgets,
        selectedWidgets,
        widgetsIds,
        setWidgets,
        setWidgetsIds,
        setSelectedWidgets,
    };

    return <WidgetsContext.Provider value={providerValue}>{children}</WidgetsContext.Provider>;
};

export default WidgetsContextProvider;
