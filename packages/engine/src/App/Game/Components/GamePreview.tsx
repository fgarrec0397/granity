import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import Widgets from "@engine/App/Widgets/Widgets";
import { FC } from "react";

const Game: FC = () => {
    const { widgetsObjectsIds } = useWidgets();

    // TODO Implement a setting to activate the Debug through the editor
    return (
        <>
            <Widgets widgetsIds={widgetsObjectsIds} />
        </>
    );
};

const GameUI: FC = () => {
    const { widgetsUIIds } = useWidgets();

    return <Widgets widgetsIds={widgetsUIIds} />;
};

export default { Game, GameUI };
