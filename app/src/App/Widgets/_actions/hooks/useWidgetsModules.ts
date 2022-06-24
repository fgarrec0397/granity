import { useWidgetsModuleContext } from "../_data/hooks";

export default () => {
    const { widgetsModules, setWidgetsModules } = useWidgetsModuleContext();

    return { widgetsModules, setWidgetsModules };
};
