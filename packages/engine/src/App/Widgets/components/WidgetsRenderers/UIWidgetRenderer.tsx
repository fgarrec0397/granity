import { UIWidgetDictionaryItem } from "@engine/App/UI/_actions/uiTypes";
import { FC } from "react";

type Props = {
    widget: UIWidgetDictionaryItem;
};

const UIWidgetRenderer: FC<Props> = ({ widget }) => {
    const { component } = widget;

    const Component = component;

    return <Component />;
};
export default UIWidgetRenderer;
