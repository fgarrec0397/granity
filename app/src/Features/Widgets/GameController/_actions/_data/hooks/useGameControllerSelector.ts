import useFeaturesSelector from "@features/Core/_actions/_data/hooks/useFeaturesSelector";

export default () => {
    return useFeaturesSelector()?.gameControllerState;
};
