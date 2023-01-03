import { useAppSelector } from "@app/Core/_actions/_data/state/store";

export default () => {
    return useAppSelector((state) => state.scenes);
};
