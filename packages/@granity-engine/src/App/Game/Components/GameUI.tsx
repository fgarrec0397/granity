import { useWidgets } from "@granity-engine/api";
import Widgets from "@granity-engine/App/Widgets/Widgets";
import { FC } from "react";

const GameUI: FC = () => {
    const { widgetsUI } = useWidgets();

    return <Widgets widgets={widgetsUI} />;
};

export default GameUI;
