import { useAppSelector } from "@granity/engine";

export default () => {
    return useAppSelector((state) => state.features);
};
