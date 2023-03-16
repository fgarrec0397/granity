import { FC } from "react";

import WidgetItem from "./components/WidgetItem";

type WidgetsProps = {
    widgetsIds: string[];
};

const Widgets: FC<WidgetsProps> = ({ widgetsIds }) => {
    return (
        <>
            {widgetsIds.map((widgetId) => (
                <WidgetItem key={widgetId} widgetId={widgetId} />
            ))}
        </>
    );
};

export default Widgets;
