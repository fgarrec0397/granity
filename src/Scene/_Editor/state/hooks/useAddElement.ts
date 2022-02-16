import useElementsOnScene from "./useElementsOnScene";

export default () => {
    const { setElementsOnScene } = useElementsOnScene();

    return (componentName: string) => {
        setElementsOnScene({
            id: "",
            component: componentName,
            name: "",
        });
    };
};
