import { UIWidgetDictionaryItem } from "@engine/App/UI/_actions/uiTypes";
import { FC } from "react";

type Props = {
    widget: UIWidgetDictionaryItem;
};

const WidgetUIRenderer: FC<Props> = ({ widget }) => {
    const { component } = widget;

    const Component = component;

    return <Component />;
};
export default WidgetUIRenderer;
