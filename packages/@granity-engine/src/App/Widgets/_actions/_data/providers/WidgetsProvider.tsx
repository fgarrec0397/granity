import { HasChildren } from "@granity/helpers";
import {
    WidgetDictionary,
    WidgetObjectsDictionaryItem,
} from "@granity-engine/App/Widgets/_actions/widgetsTypes";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

export interface WidgetsContextModel {
    widgets: WidgetDictionary;
    widgetsIds: string[];
    selectedWidgets: WidgetObjectsDictionaryItem[];
    setWidgetsIds: Dispatch<SetStateAction<string[]>>;
    setWidgets: Dispatch<SetStateAction<WidgetDictionary>>;
    setSelectedWidgets: Dispatch<SetStateAction<WidgetObjectsDictionaryItem[]>>;
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
    const [selectedWidgets, setSelectedWidgets] = useState<WidgetObjectsDictionaryItem[]>([]);

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
