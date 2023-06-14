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
                if (item.children?.length) {
                    return (
                        <WidgetRenderer key={item.id} widgetId={item}>
                            <Widgets widgetsIds={item.children} />
                        </WidgetRenderer>
                    );
                }

                return <WidgetRenderer key={item.id} widgetId={item} />;
            })}
        </>
    );
};

export default Widgets;
