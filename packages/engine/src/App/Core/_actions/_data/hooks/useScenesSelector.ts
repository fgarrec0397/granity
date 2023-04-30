import { useAppSelector } from "@engine/App/Core/_actions/_data/state/store";

export default () => {
    return useAppSelector((state) => state.core);
};
