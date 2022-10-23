import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

import { WidgetModule, WidgetUIModule } from "../../widgetsTypes";

export interface WidgetModuleContextModel {
    widgetsModules: WidgetModule[] | [];
    widgetsUIModules: WidgetUIModule[] | [];
    setWidgetsModules: (() => void) | Dispatch<SetStateAction<WidgetModule[]>>;
    setWidgetsUIModules: (() => void) | Dispatch<SetStateAction<WidgetUIModule[]>>;
}

export const defaultContext: WidgetModuleContextModel = {
    widgetsModules: [],
    widgetsUIModules: [],
    setWidgetsModules: () => {},
    setWidgetsUIModules: () => {},
};

export const WidgetsModulesContext = createContext<WidgetModuleContextModel>(defaultContext);

type Props = {
    children: ReactNode;
};

const WidgetsModulesContextProvider: FC<Props> = ({ children }) => {
    const [widgetsModules, setWidgetsModules] = useState<WidgetModule[]>([]);
    const [widgetsUIModules, setWidgetsUIModules] = useState<WidgetUIModule[]>([]);

    const providerValue: WidgetModuleContextModel = {
        widgetsModules,
        widgetsUIModules,
        setWidgetsModules,
        setWidgetsUIModules,
    };

    return (
        <WidgetsModulesContext.Provider value={providerValue}>
            {children}
        </WidgetsModulesContext.Provider>
    );
};

export default WidgetsModulesContextProvider;
