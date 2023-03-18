import { useWidgets } from "@engine/App/Widgets";
import Widgets from "@engine/App/Widgets/Widgets";
import { FC } from "react";

const GameScene: FC = () => {
    const { widgetsObjectsIds } = useWidgets();

    return <Widgets widgetsIds={widgetsObjectsIds} />;
};

export default GameScene;
