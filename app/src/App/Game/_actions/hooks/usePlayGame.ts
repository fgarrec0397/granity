import { useIsEditor } from "@app/Editor/_actions/hooks";

export default () => {
    const { setIsEditor } = useIsEditor();

    // This hook will be in charge to init all the process set the game up
    const playGame = () => {
        setIsEditor();
    };

    return { playGame };
};
