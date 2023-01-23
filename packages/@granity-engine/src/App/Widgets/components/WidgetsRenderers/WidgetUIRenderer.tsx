import { WidgetUIDictionaryItem } from "@granity-engine/App/Widgets/_actions/widgetsTypes";
import { FC } from "react";

import useWidgetsUtilities from "../../_actions/hooks/useWidgetsUtilities";

type Props = {
    widget: WidgetUIDictionaryItem;
};

const WidgetUIRenderer: FC<Props> = ({ widget: { component, id } }) => {
    const { getWidgetProps } = useWidgetsUtilities();
    const Component = component;

    const widgetProps = getWidgetProps(id);

    return <Component {...widgetProps} />;
};
export default WidgetUIRenderer;
