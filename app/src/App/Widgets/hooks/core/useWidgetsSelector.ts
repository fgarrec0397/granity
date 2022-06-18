import { useAppSelector } from "../@core/store";

export default () => {
    return useAppSelector((state) => state.widgets);
};
