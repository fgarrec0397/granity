import { UIWidgetDictionary, UIWidgetDictionaryItem } from "@engine/App/UI/_actions/uiTypes";
import { HasChildren } from "@granity/helpers";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

export interface UIWidgetsContextModel {
    uiWidgets: UIWidgetDictionary;
    uiWidgetsIds: string[];
    selectedWidgets: UIWidgetDictionaryItem[];
    setWidgetsIds: Dispatch<SetStateAction<string[]>>;
    setWidgets: Dispatch<SetStateAction<UIWidgetDictionary>>;
    setSelectedWidgets: Dispatch<SetStateAction<UIWidgetDictionaryItem[]>>;
}

export const uiWidgetsDefaultContext: UIWidgetsContextModel = {
    uiWidgets: {},
    uiWidgetsIds: [],
    selectedWidgets: [],
    setWidgets: () => {},
    setWidgetsIds: () => {},
    setSelectedWidgets: () => {},
};

export const UIWidgetsContext = createContext<UIWidgetsContextModel>(uiWidgetsDefaultContext);

type Props = HasChildren;

const WidgetsContextProvider: FC<Props> = ({ children }) => {
    const [uiWidgets, setWidgets] = useState<UIWidgetDictionary>({});
    const [uiWidgetsIds, setWidgetsIds] = useState<string[]>([]);
    const [selectedWidgets, setSelectedWidgets] = useState<UIWidgetDictionaryItem[]>([]);

    const providerValue: UIWidgetsContextModel = {
        uiWidgets,
        selectedWidgets,
        uiWidgetsIds,
        setWidgets,
        setWidgetsIds,
        setSelectedWidgets,
    };

    return <UIWidgetsContext.Provider value={providerValue}>{children}</UIWidgetsContext.Provider>;
};

export default WidgetsContextProvider;
