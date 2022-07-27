import { useIsEditor } from "@app/Editor/_actions/hooks";

export default () => {
    const { setIsEditor } = useIsEditor();

    const playGame = () => {
        setIsEditor();
    };

    return { playGame };
};
