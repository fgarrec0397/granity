import { createWidget, FieldType, useScenes, WidgetType } from "@granity/engine";
import { Button, pxToRem, Wrapper, WrapperProps } from "@granity/ui";
import { FC } from "react";

type PlayMenuStyles = {
    wrapper?: WrapperProps;
};

const styles: PlayMenuStyles = {
    wrapper: {
        sx: {
            position: "absolute",
            top: "40%",
            right: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: pxToRem(200),
            height: pxToRem(200),
            backgroundColor: "white",
            border: 1,
            transform: "translate(50%, -50%)",
        },
    },
};

const PlayMenu: FC = () => {
    const { loadScene } = useScenes();

    const handleChangeScene = () => {
        loadScene("Game");
    };

    return (
        <Wrapper {...styles.wrapper}>
            <Button onClick={handleChangeScene}>Play</Button>
        </Wrapper>
    );
};

export const widget = createWidget({
    component: PlayMenu,
    reducer: null,
    type: WidgetType.UI,
    name: "PlayMenu",
    options: [
        {
            name: "translateXOnPlay",
            displayName: "Translate X on play",
            fieldType: FieldType.Checkbox,
            defaultValue: false,
        },
    ],
});
