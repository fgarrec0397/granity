import { createUI, FieldType, useScenes } from "@granity/engine";
import { Box, BoxProps, Button, pxToRem } from "@granity/ui";
import { FC } from "react";

type PlayMenuStyles = {
    box?: BoxProps;
};

const styles: PlayMenuStyles = {
    box: {
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
        <Box {...styles.box}>
            <Button onClick={handleChangeScene}>Play</Button>
        </Box>
    );
};

export const widget = createUI({
    component: PlayMenu,
    reducer: null,
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
