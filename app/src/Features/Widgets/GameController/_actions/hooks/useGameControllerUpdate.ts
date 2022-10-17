import useGameUpdate from "@app/Game/_actions/hooks/useGameUpdate";

export default () => {
    useGameUpdate(() => {
        console.log("update");
    });
};
