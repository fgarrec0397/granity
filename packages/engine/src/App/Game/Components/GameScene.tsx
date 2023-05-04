import useHandleInitScenes from "@engine/App/Scenes/_actions/hooks/useHandleInitScenes";
import { useWidgets } from "@engine/App/Widgets";
import Widgets from "@engine/App/Widgets/Widgets";
import { FC } from "react";

import { useHandleGameStart } from "../_actions/hooks";

const GameScene: FC = () => {
    const { widgetsObjectsIds } = useWidgets();

    useHandleInitScenes();
    useHandleGameStart();

    return <Widgets widgetsIds={widgetsObjectsIds} />;
};

export default GameScene;
