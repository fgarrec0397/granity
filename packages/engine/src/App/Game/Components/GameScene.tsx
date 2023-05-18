import useHandleInitScenes from "@engine/App/Scenes/_actions/hooks/useHandleInitScenes";
import { useWidgets } from "@engine/App/Widgets";
import Widgets from "@engine/App/Widgets/Widgets";
import { Physics } from "@granity/physics";
import { FC } from "react";

import { useHandleGameStart } from "../_actions/hooks";

const GameScene: FC = () => {
    const { widgetsObjectsIds } = useWidgets();

    useHandleInitScenes("publishedScenes");
    useHandleGameStart();

    return (
        <Physics>
            <Widgets widgetsIds={widgetsObjectsIds} />
        </Physics>
    );
};

export default GameScene;
