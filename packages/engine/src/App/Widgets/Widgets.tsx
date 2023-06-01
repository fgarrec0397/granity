import { FC } from "react";

import WidgetRenderer from "./components/WidgetRenderer";

type WidgetsProps = {
    widgetsIds: string[];
};

const Widgets: FC<WidgetsProps> = ({ widgetsIds }) => {
    return (
        <>
            {widgetsIds.map((widgetId) => (
                <WidgetRenderer key={widgetId} widgetId={widgetId} />
            ))}
        </>
    );
};

export default Widgets;
