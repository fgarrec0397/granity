import React, { FC } from "react";
import useWidgets from "./state/hooks/useWidgets";
import WidgetRenderer from "./components/WidgetRenderer";

const Widgets: FC = () => {
    const { widgets } = useWidgets();

    return (
        <>
            {widgets.map((widget) => (
                <WidgetRenderer key={widget.id} widget={widget} />
            ))}
        </>
    );
};

export default Widgets;
