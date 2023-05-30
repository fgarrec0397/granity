import { UIWidgetDictionaryItem } from "@engine/App/UI/_actions/uiTypes";
import { FC } from "react";

import useWidgetsUtilities from "../../_actions/hooks/useWidgetsUtilities";

type Props = {
    widget: UIWidgetDictionaryItem;
};

const WidgetUIRenderer: FC<Props> = ({ widget: { component, id } }) => {
    const { getWidgetProps } = useWidgetsUtilities();
    const Component = component;

    const widgetProps = getWidgetProps(id);

    return <Component {...widgetProps} />;
};
export default WidgetUIRenderer;
