import { useAppSelector } from "@app/Core/store";

export default () => {
    return useAppSelector((state) => state.scenes);
};
