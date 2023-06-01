import Widgets from "@engine/App/Widgets/Widgets";
import { FC } from "react";

import useGameWidgets from "../_actions/hooks/useGameWidgets";

const GameWidgets: FC = () => {
    const { gameWidgetsIds } = useGameWidgets();

    return <Widgets widgetsIds={gameWidgetsIds} />;
};

export default GameWidgets;
