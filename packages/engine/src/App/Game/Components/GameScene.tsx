import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import useHandleInitScenes from "@engine/App/Scenes/_actions/hooks/useHandleInitScenes";
import { useWidgets } from "@engine/App/Widgets";
import Widgets from "@engine/App/Widgets/Widgets";
import { Physics } from "@granity/physics";
import { FC } from "react";

import { useHandleGameStart } from "../_actions/hooks";

const GameScene: FC = () => {
    const { widgetsObjectsIds } = useWidgets();
    const { physicsEnabled } = useConfig();

    console.log(physicsEnabled, "physicsEnabled");

    useHandleInitScenes("publishedScenes");
    useHandleGameStart();

    // TODO - continue here. Add a config to enable physics globally. It should also be exposed
    return (
        <Physics>
            <Widgets widgetsIds={widgetsObjectsIds} />
        </Physics>
    );
};

export default GameScene;
