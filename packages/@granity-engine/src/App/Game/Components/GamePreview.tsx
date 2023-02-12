import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import Widgets from "@granity-engine/App/Widgets/Widgets";
import { Physics } from "@react-three/rapier";
import { FC } from "react";

const Game: FC = () => {
    const { widgetsObjectsIds } = useWidgets();

    // TODO Implement a setting to activate the Debug through the editor
    return (
        <>
            <Physics>
                <Widgets widgetsIds={widgetsObjectsIds} />
            </Physics>
        </>
    );
};

const GameUI: FC = () => {
    const { widgetsUIIds } = useWidgets();

    return <Widgets widgetsIds={widgetsUIIds} />;
};

export default { Game, GameUI };
