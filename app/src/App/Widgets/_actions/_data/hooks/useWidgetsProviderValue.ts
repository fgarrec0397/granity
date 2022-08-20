import { WidgetObjects, WidgetSceneObject } from "@app/Widgets/_actions/widgetsTypes";
import { useState } from "react";

export default () => {
    const [widgets, setWidgets] = useState<WidgetObjects>({});
    const [selectedWidgets, setSelectedWidgets] = useState<WidgetSceneObject[]>([]);

    return {
        widgets,
        setWidgets,
        selectedWidgets,
        setSelectedWidgets,
    };
};
