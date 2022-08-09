import { useContext } from "react";

import { GameWidgetsContext } from "../providers/GameWidgetsProvider";

export default () => {
    return useContext(GameWidgetsContext);
};
