import { WidgetObjects } from "@app/Widgets/_actions/widgetsTypes";
import { useState } from "react";

export default () => {
    const [widgets, setWidgets] = useState<WidgetObjects>({});

    return {
        widgets,
        setWidgets,
    };
};
