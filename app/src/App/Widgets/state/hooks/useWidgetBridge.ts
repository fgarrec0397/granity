import useWidgets from "./useWidgets";

export default () => {
    const widgetsHook = useWidgets();

    return {
        get: (property: string) => {
            return (widgetsHook as any)[property]; // TODO - fix this any type
        },
    };
};
