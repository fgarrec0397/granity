import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

import { WidgetObjectModule } from "../../widgetsTypes";

export interface WidgetModuleContextModel {
    widgetsModules: WidgetObjectModule[] | [];
    setWidgetsModules: (() => void) | Dispatch<SetStateAction<WidgetObjectModule[]>>;
}

export const defaultContext: WidgetModuleContextModel = {
    widgetsModules: [],
    setWidgetsModules: () => {},
};

export const WidgetsModulesContext = createContext<WidgetModuleContextModel>(defaultContext);

type Props = {
    children: ReactNode;
};

const WidgetsModulesContextProvider: FC<Props> = ({ children }) => {
    const [widgetsModules, setWidgetsModules] = useState<WidgetObjectModule[]>([]);

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
