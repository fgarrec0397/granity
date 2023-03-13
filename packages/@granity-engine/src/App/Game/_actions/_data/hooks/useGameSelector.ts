import { useAppSelector } from "@granity/engine/App/Core/_actions/_data/state/store";

export default () => useAppSelector((state) => state.game);
