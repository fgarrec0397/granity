import { StyledWrapper, Typography } from "@app/Common/components/Html";
import useScenes from "@app/Scenes/_actions/hooks/useScenes";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { FieldType, WidgetType } from "@app/Widgets/_actions/widgetsConstants";
import { Button } from "antd";
import { FC } from "react";
import { css } from "styled-components";

import usePoop from "../Poop/_actions/hooks/usePoop";
import useToilets from "../Toilets/_actions/hooks/useToilets";

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
    const { score, resetPoop } = usePoop();
    const { removeAllToiletsChunks } = useToilets();

    const handleResetGame = () => {
        resetPoop();
        removeAllToiletsChunks();
        loadScene("Game");
    };

    return (
        <StyledWrapper {...styles.wrapper}>
            <Typography {...styles.text}>Your score was {score}</Typography>
            <Button onClick={handleResetGame}>Play</Button>
        </StyledWrapper>
    );
};

export const widget = createWidget({
    component: EndScreen,
    reducer: null,
    type: WidgetType.UI,
    widgetDefinition: {
        name: "End Screen",
        options: [
            {
                name: "translateXOnPlay",
                displayName: "Translate X on play",
                fieldType: FieldType.Checkbox,
                defaultValue: false,
            },
        ],
    },
});
