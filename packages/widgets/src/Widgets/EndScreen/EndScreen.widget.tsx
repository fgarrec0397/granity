import { createWidget, useScenes } from "@granity/engine";
import { Box, BoxProps, Button, pxToRem, Typography, TypographyProps } from "@granity/ui";
import { FC } from "react";

type EndScreenStyles = {
    box?: BoxProps;
    text?: TypographyProps;
};

const styles: EndScreenStyles = {
    box: {
        sx: {
            position: "absolute",
            top: "40%",
            right: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: pxToRem(200),
            height: pxToRem(200),
            backgroundColor: "white",
            border: 1,
            transform: "translate(50%, -50%)",
        },
    },
    text: {
        sx: {
            marginBottom: 1,
        },
    },
};

const EndScreen: FC = () => {
    const { loadScene } = useScenes();

    const handleResetGame = () => {
        loadScene("Game");
    };

    return (
        <Box {...styles.box}>
            <Typography {...styles.text}>Your died</Typography>
            <Button onClick={handleResetGame}>Play</Button>
        </Box>
    );
};

export const widget = createWidget({
    component: EndScreen,
    reducer: null,
    name: "End Screen",
});
