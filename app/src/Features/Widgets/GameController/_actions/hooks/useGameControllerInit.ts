import useGameInit from "@app/Game/_actions/hooks/useGameInit";

export default () => {
    useGameInit(() => {
        console.log("init");
    });
};
