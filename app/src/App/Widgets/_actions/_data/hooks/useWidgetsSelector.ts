import { useAppSelector } from "@core/store";

export default () => useAppSelector((state) => state.widgets);
