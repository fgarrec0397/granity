import { useAppSelector } from "@engine/App/Core/_actions/_data/state/store";

export default () => useAppSelector((state) => state.game);
