import {
    WidgetObjectsDictionary,
    WidgetObjectsDictionaryItem,
} from "@app/Widgets/_actions/widgetsTypes";
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

export interface WidgetsContextModel {
    widgets: WidgetObjectsDictionary;
    selectedWidgets: WidgetObjectsDictionaryItem[];
    setWidgets: Dispatch<SetStateAction<WidgetObjectsDictionary>>;
    setSelectedWidgets: Dispatch<SetStateAction<WidgetObjectsDictionaryItem[]>>;
}

export const widgetsDefaultContext: WidgetsContextModel = {
    widgets: {},
    selectedWidgets: [],
    setWidgets: () => {},
    setSelectedWidgets: () => {},
};

export const WidgetsContext = createContext<WidgetsContextModel>(widgetsDefaultContext);

type Props = {
    children: ReactNode;
};

const WidgetsContextProvider: FC<Props> = ({ children }) => {
    const [widgets, setWidgets] = useState<WidgetObjectsDictionary>({});
    const [selectedWidgets, setSelectedWidgets] = useState<WidgetObjectsDictionaryItem[]>([]);

    const providerValue: WidgetsContextModel = {
        widgets,
        selectedWidgets,
        setWidgets,
        setSelectedWidgets,
    };

    return <WidgetsContext.Provider value={providerValue}>{children}</WidgetsContext.Provider>;
};

export default WidgetsContextProvider;
