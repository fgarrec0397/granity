import { HasChildren } from "@granity/helpers";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

import { WidgetModule } from "../../widgetsTypes";

export interface WidgetModuleContextModel {
    widgetsModules: WidgetModule[] | [];
    setWidgetsModules: (() => void) | Dispatch<SetStateAction<WidgetModule[]>>;
}

export const defaultContext: WidgetModuleContextModel = {
    widgetsModules: [],
    setWidgetsModules: () => {},
};

export const WidgetsModulesContext = createContext<WidgetModuleContextModel>(defaultContext);

type Props = HasChildren;

const WidgetsModulesContextProvider: FC<Props> = ({ children }) => {
    const [widgetsModules, setWidgetsModules] = useState<WidgetModule[]>([]);

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
