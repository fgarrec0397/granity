import { createWidget, FieldType, useScenes, WidgetType } from "@granity/engine";
import { Box, BoxProps, Button, pxToRem } from "@granity/ui";
import { FC } from "react";

type PlayMenuStyles = {
    wrapper?: BoxProps;
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
        <Box {...styles.wrapper}>
            <Button onClick={handleChangeScene}>Play</Button>
        </Box>
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
