import { FC } from "react";

import { WidgetsIds } from "./_actions/widgetsTypes";
import WidgetRenderer from "./components/WidgetRenderer";

type WidgetsProps = {
    widgetsIds: WidgetsIds;
};

const Widgets: FC<WidgetsProps> = ({ widgetsIds }) => {
    return (
        <>
            {widgetsIds.map((item) => {
                // TODO - continue here. Investigate to manage children widgets from here instead of within the Renderer
                if (item.children?.length) {
                    return (
                        <WidgetRenderer key={item.id} widgetId={item.id}>
                            <Widgets widgetsIds={item.children} />
                        </WidgetRenderer>
                    );
                }

                return <WidgetRenderer key={item.id} widgetId={item.id} />;
            })}
        </>
    );
};

export default Widgets;
