import { HasChildren } from "@granity/helpers";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

import { UIWidgetModule } from "../../uiTypes";

export interface UIWidgetModuleContextModel {
    widgetsModules: UIWidgetModule[] | [];
    setWidgetsModules: (() => void) | Dispatch<SetStateAction<UIWidgetModule[]>>;
}

export const defaultContext: UIWidgetModuleContextModel = {
    widgetsModules: [],
    setWidgetsModules: () => {},
};

export const WidgetsModulesContext = createContext<UIWidgetModuleContextModel>(defaultContext);

type Props = HasChildren;

const UIWidgetsModulesContextProvider: FC<Props> = ({ children }) => {
    const [widgetsModules, setWidgetsModules] = useState<UIWidgetModule[]>([]);

    const providerValue: UIWidgetModuleContextModel = {
        widgetsModules,
        setWidgetsModules,
    };

    return (
        <WidgetsModulesContext.Provider value={providerValue}>
            {children}
        </WidgetsModulesContext.Provider>
    );
};

export default UIWidgetsModulesContextProvider;
