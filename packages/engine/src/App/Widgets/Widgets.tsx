import { FC } from "react";

import { WidgetsIds } from "./_actions/widgetsTypes";
import WidgetRenderer from "./components/WidgetRenderer";

type WidgetsProps = {
    widgetsIds: WidgetsIds;
};

const Widgets: FC<WidgetsProps> = ({ widgetsIds }) => {
    return (
        <>
            {widgetsIds.map((widgetId) => {
                if (typeof widgetId === "string") {
                    return <WidgetRenderer key={widgetId} widgetId={widgetId} />;
                }

                return (
                    <WidgetRenderer key={widgetId[0]} widgetId={widgetId[0]}>
                        <Widgets widgetsIds={widgetId[1]} />
                    </WidgetRenderer>
                );
            })}
        </>
    );
};

export default Widgets;
