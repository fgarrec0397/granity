import { useGameInit } from "@granity/engine";

import useWidgetStarter2 from "./useWidgetStarter2";

export default () => {
    const { makeThisWidgetAlive } = useWidgetStarter2();

    useGameInit(() => {
        makeThisWidgetAlive();
    });
};
