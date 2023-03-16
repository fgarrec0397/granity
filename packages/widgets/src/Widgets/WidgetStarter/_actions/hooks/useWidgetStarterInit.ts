import { useGameInit } from "@granity/engine";

import useWidgetStarter from "./useWidgetStarter";

export default () => {
    const { makeThisWidgetAlive } = useWidgetStarter();

    useGameInit(() => {
        makeThisWidgetAlive();
    });
};
