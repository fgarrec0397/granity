import { useWidgets } from "@granity-engine/api";
import Widgets from "@granity-engine/App/Widgets/Widgets";
import { FC } from "react";

const GameUI: FC = () => {
    const { widgetsUIIds } = useWidgets();

    return <Widgets widgetsIds={widgetsUIIds} />;
};

export default GameUI;
