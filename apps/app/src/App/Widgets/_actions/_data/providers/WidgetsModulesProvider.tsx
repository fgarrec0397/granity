import { HasChildren } from "@app/Common/commonTypes";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

import { WidgetObjectModule, WidgetUIModule } from "../../widgetsTypes";

export interface WidgetModuleContextModel {
    widgetsObjectModules: WidgetObjectModule[] | [];
    widgetsUIModules: WidgetUIModule[] | [];
    setWidgetsModules: (() => void) | Dispatch<SetStateAction<WidgetObjectModule[]>>;
    setWidgetsUIModules: (() => void) | Dispatch<SetStateAction<WidgetUIModule[]>>;
}

export const defaultContext: WidgetModuleContextModel = {
    widgetsObjectModules: [],
    widgetsUIModules: [],
    setWidgetsModules: () => {},
    setWidgetsUIModules: () => {},
};

export const WidgetsModulesContext = createContext<WidgetModuleContextModel>(defaultContext);

type Props = HasChildren;

const WidgetsModulesContextProvider: FC<Props> = ({ children }) => {
    const [widgetsObjectModules, setWidgetsModules] = useState<WidgetObjectModule[]>([]);
    const [widgetsUIModules, setWidgetsUIModules] = useState<WidgetUIModule[]>([]);

    const providerValue: WidgetModuleContextModel = {
        widgetsObjectModules,
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
