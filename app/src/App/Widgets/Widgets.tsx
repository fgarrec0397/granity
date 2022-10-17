import { Select } from "@react-three/drei";
import { FC } from "react";

import useWidgets from "./_actions/hooks/useWidgets";
import { WidgetObjectsDictionaryItem } from "./_actions/widgetsTypes";
import WidgetRenderer from "./components/WidgetRenderer";

interface WidgetProps {
    widget: WidgetObjectsDictionaryItem;
}

const Widgets: FC = () => {
    const { widgets, selectWidgetFromMeshArr } = useWidgets();

    return (
        <Select multiple onChange={selectWidgetFromMeshArr}>
            {Object.keys(widgets).map((widgetId) => (
                <Widget key={widgetId} widget={widgets[widgetId]} />
            ))}
        </Select>
    );
};

const Widget: FC<WidgetProps> = ({ widget }) => {
    const { id } = widget;

    if (id) {
        return <WidgetRenderer widget={widget} />;
    }

    return null;
};

export default Widgets;
