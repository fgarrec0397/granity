import { HasChildren } from "@granity/helpers";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

import { WidgetModules } from "../../widgetsTypes";

export interface WidgetModuleContextModel {
    widgetsModules: WidgetModules[] | [];
    setWidgetsModules: (() => void) | Dispatch<SetStateAction<WidgetModules[]>>;
}

export const defaultContext: WidgetModuleContextModel = {
    widgetsModules: [],
    setWidgetsModules: () => {},
};

export const WidgetsModulesContext = createContext<WidgetModuleContextModel>(defaultContext);

type Props = HasChildren;

const WidgetsModulesContextProvider: FC<Props> = ({ children }) => {
    const [widgetsModules, setWidgetsModules] = useState<WidgetModules[]>([]);

    const providerValue: WidgetModuleContextModel = {
        widgetsModules,
        setWidgetsModules,
    };

    return (
        <WidgetsModulesContext.Provider value={providerValue}>
            {children}
        </WidgetsModulesContext.Provider>
    );
};

export default WidgetsModulesContextProvider;
