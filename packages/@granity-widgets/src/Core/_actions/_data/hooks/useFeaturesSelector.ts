import { FeaturesState, store, useAppSelector } from "@granity/engine";
import { TypedUseSelectorHook, useSelector } from "react-redux";

type AppState = ReturnType<typeof store.getState>;

export const useAppSelectorTest: TypedUseSelectorHook<AppState> = useSelector;

export default () => {
    return useAppSelectorTest((state) => {
        console.log(state, "state");

        return state.features;
    });
};
