import Lights from "@granity-engine/App/Scenes/components/Lights";
import { useWidgets } from "@granity-engine/App/Widgets";
import Widgets from "@granity-engine/App/Widgets/Widgets";
import { Physics } from "@react-three/rapier";
import { FC } from "react";

const GameScene: FC = () => {
    const { widgetsObjects } = useWidgets();

    return (
        <>
            <Lights />
            <Physics>
                <Widgets widgets={widgetsObjects} />
            </Physics>
        </>
    );
};

export default GameScene;
