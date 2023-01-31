import { useAppSelector } from "@granity-widgets/Core/_actions/_data/state/store";

export default () => {
    return useAppSelector((state) => state.features);
};
