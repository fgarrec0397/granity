import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import Widgets from "@app/Widgets/Widgets";
import { Physics } from "@react-three/rapier";
import { FC } from "react";

const Game: FC = () => {
    const { widgetsObjects } = useWidgets();

    // TODO Implement a setting to activate the Debug through the editor
    return (
        <>
            <Physics>
                {/* <Debug /> */}
                <Widgets widgets={widgetsObjects} />
            </Physics>
        </>
    );
};

const GameUI: FC = () => {
    const { widgetsUI } = useWidgets();

    return <Widgets widgets={widgetsUI} />;
};

export default { Game, GameUI };
