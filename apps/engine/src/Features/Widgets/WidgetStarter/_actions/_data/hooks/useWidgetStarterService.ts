import useWidgetStarterDispatch from "./useWidgetStarterDispatch";

export default () => {
    const { dispatchAdd } = useWidgetStarterDispatch();

    const add = (message: string) => {
        dispatchAdd(message);
    };

    return { add };
};
