import { StyledWrapper } from "@app/Common/components/Html";
import Typography from "@app/Common/components/Html/Typography";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { WidgetType } from "@app/Widgets/_actions/widgetsConstants";
import { FC } from "react";
import { css } from "styled-components";

import usePoop from "../Poop/_actions/hooks/usePoop";

const styles = {
    wrapper: {
        css: css`
            position: absolute;
            top: 16px;
            right: 16px;
            width: 150px;
            height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            border: 3px solid #f0f0f0;
            font-size: 24px;
        `,
    },
    scoreLabel: {
        css: css`
            margin-right: 10px;
        `,
    },
    scoreText: {
        css: css`
            font-weight: bold;
        `,
    },
};

const Score: FC = () => {
    const { score } = usePoop();

    return (
        <StyledWrapper {...styles.wrapper}>
            <Typography {...styles.scoreLabel}>Score:</Typography>
            <Typography {...styles.scoreText}>{score}</Typography>
        </StyledWrapper>
    );
};

export const widget = createWidget({
    component: Score,
    reducer: null,
    type: WidgetType.UI,
    widgetDefinition: {
        name: "Score",
    },
});
