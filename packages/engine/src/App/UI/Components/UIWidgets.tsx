import useUIWidgets from "@engine/App/UI/_actions/hooks/useUIWidgets";
import Widgets from "@engine/App/Widgets/Widgets";
import { FC } from "react";

const UIWidgets: FC = () => {
    const { uiWidgetsIds } = useUIWidgets();

    return <Widgets widgetsIds={uiWidgetsIds} />;
};

export default UIWidgets;
