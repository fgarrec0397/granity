import { gameWidgetPrefix } from "@engine/App/Game/_actions/gameConstants";

import { GameWidgetDictionaryItem } from "../gameTypes";

export default (widget: GameWidgetDictionaryItem) => {
    return `${gameWidgetPrefix}+${widget.name}+${widget.id}`;
};
