import Lights from "@granity-engine/App/Scenes/components/Lights";
import { useWidgets } from "@granity-engine/App/Widgets";
import Widgets from "@granity-engine/App/Widgets/Widgets";
import { Physics } from "@react-three/rapier";
import { FC } from "react";

const GameScene: FC = () => {
    const { widgetsObjectsIds } = useWidgets();

    return (
        <>
            <Lights />
            <Physics>
                <Widgets widgetsIds={widgetsObjectsIds} />
            </Physics>
        </>
    );
};

export default GameScene;
