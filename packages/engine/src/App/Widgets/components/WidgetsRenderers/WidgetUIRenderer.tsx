import useUIWidgets from "@engine/App/UI/_actions/hooks/useUIWidgets";
import { FC } from "react";

type Props = {
    widgetId: string;
};

const WidgetUIRenderer: FC<Props> = ({ widgetId }) => {
    const { getUIWidgetById } = useUIWidgets();
    const { component } = getUIWidgetById(widgetId)!;

    const Component = component;

    return <Component />;
};
export default WidgetUIRenderer;
