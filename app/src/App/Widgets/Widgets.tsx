import { FC } from "react";

import { WidgetDictionary } from "./_actions/widgetsTypes";
import WidgetItem from "./components/WidgetItem";

type WidgetsProps = {
    widgets: WidgetDictionary;
};

const Widgets: FC<WidgetsProps> = ({ widgets }) => {
    return (
        <>
            {Object.keys(widgets).map((widgetId) => (
                <WidgetItem key={widgetId} widget={widgets[widgetId]} />
            ))}
        </>
    );
};

export default Widgets;
