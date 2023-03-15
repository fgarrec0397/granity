import useFeaturesSelector from "@widgets/Core/_actions/_data/hooks/useFeaturesSelector";

export default () => {
    return useFeaturesSelector()?.widgetStarter;
};
