import useScenes from "@app/Scenes/_actions/hooks/useScenes";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { FieldType, WidgetType } from "@app/Widgets/_actions/widgetsConstants";
import { FC } from "react";
import { css } from "styled-components";
import { Button, StyledWrapper } from "ui-granity";

const styles = {
    wrapper: {
        css: css`
            position: absolute;
            top: 40%;
            right: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 200px;
            height: 200px;
            background-color: white;
            border: 1px solid rgb(240, 240, 240);
            transform: translate(50%, -50%);
        `,
    },
};

const PlayMenu: FC = () => {
    const { loadScene } = useScenes();

    const handleChangeScene = () => {
        loadScene("Game");
    };

    return (
        <StyledWrapper {...styles.wrapper}>
            <Button onClick={handleChangeScene}>Play</Button>
        </StyledWrapper>
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
