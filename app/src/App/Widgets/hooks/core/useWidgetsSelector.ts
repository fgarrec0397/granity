import { useAppSelector } from "../../../Core/store";

export default () => {
    return useAppSelector((state) => state.widgets);
};
