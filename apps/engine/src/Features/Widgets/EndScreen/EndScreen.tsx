import useScenes from "@app/Scenes/_actions/hooks/useScenes";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { WidgetType } from "@app/Widgets/_actions/widgetsConstants";
import { Button, StyledWrapper, Typography } from "@granity/ui";
import { FC } from "react";
import { css } from "styled-components";

const styles = {
    wrapper: {
        css: css`
            position: absolute;
            top: 40%;
            right: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 200px;
            height: 200px;
            background-color: white;
            border: 1px solid rgb(240, 240, 240);
            transform: translate(50%, -50%);
        `,
    },
    text: {
        css: css`
            margin-bottom: 1em;
        `,
    },
};

// Reset scene and position on restart

const EndScreen: FC = () => {
    const { loadScene } = useScenes();

    const handleResetGame = () => {
        loadScene("Game");
    };

    return (
        <StyledWrapper {...styles.wrapper}>
            <Typography {...styles.text}>Your died</Typography>
            <Button onClick={handleResetGame}>Play</Button>
        </StyledWrapper>
    );
};

export const widget = createWidget({
    component: EndScreen,
    reducer: null,
    type: WidgetType.UI,
    name: "End Screen",
});
