import useWidgetStarterDispatch from "./useWidgetStarterDispatch";
import useWidgetStarterSelector from "./useWidgetStarterSelector";

export default () => {
    const { dispatchAdd } = useWidgetStarterDispatch();
    const widgetStarter = useWidgetStarterSelector();

    const add = (message: string) => {
        dispatchAdd(message);
    };

    return { add, widgetStarterMessage: widgetStarter?.widgetStarterMessage };
};
