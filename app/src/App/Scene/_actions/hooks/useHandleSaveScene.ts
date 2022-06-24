import { off, on } from "@app/Core/utilities/events";
import { useWidgets } from "@app/Widgets/_actions/hooks";
import { useEffect } from "react";

import { saveScene } from "../_data/services";

export default () => {
    const { widgets, widgetsDictionary } = useWidgets();

    useEffect(() => {
        const handleSaveFile = async () => {
            await saveScene({ widgets, widgetsDictionary });
        };

        on("saveFile:click", handleSaveFile);

        return () => {
            off("saveFile:click", handleSaveFile);
        };
    }, [widgets, widgetsDictionary]);
};
