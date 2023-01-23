import { useAppSelector } from "@granity-engine/App/Core/_actions/_data/state/store";

export default () => {
    return useAppSelector((state) => state.scenes);
};
