import { createWidget, useScenes, WidgetType } from "@granity/engine";
import { Button, pxToRem, Typography, TypographyProps, Wrapper, WrapperProps } from "@granity/ui";
import { FC } from "react";

type EndScreenStyles = {
    wrapper?: WrapperProps;
    text?: TypographyProps;
};

const styles: EndScreenStyles = {
    wrapper: {
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
        <Wrapper {...styles.wrapper}>
            <Typography {...styles.text}>Your died</Typography>
            <Button onClick={handleResetGame}>Play</Button>
        </Wrapper>
    );
};

export const widget = createWidget({
    component: EndScreen,
    reducer: null,
    type: WidgetType.UI,
    name: "End Screen",
});
