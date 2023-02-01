import useFeaturesSelector from "@granity-widgets/Core/_actions/_data/hooks/useFeaturesSelector";

export default () => {
    return useFeaturesSelector()?.widgetStarter;
};
