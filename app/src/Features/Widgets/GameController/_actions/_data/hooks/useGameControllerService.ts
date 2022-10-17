import usegameControllerDispatch from "./useGameControllerDispatch";

export default () => {
    const { dispatchAdd } = usegameControllerDispatch();

    const add = (message: string) => {
        dispatchAdd(message);
    };

    return { add };
};
