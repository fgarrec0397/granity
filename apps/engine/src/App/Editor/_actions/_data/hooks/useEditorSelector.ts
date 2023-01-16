import { useAppSelector } from "@app/Core/_actions/_data/state/store";

export default () => useAppSelector((state) => state.editor);
