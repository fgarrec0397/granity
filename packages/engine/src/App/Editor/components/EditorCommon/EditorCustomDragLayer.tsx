import { useDragLayer, XYCoord } from "@granity/draggable";
import type { CSSProperties, FC } from "react";

import { DraggableTypes } from "../../_actions/editorConstants";
import ListItemDragPreview from "./ListItemDragPreview";

const layerStyles: CSSProperties = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 100,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
};

function getItemStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null) {
    if (!initialOffset || !currentOffset) {
        return {
            display: "none",
        };
    }

    const { x, y } = currentOffset;

    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform,
    };
}

const EditorCustomDragLayer: FC = () => {
    const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer(
        (monitor) => ({
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
            isDragging: monitor.isDragging(),
        })
    );

    function renderItem() {
        switch (itemType) {
            case DraggableTypes.ListItem:
                return <ListItemDragPreview dragItem={item} />;
            default:
                return null;
        }
    }

    if (!isDragging) {
        return null;
    }
    return (
        <div style={layerStyles}>
            <div style={getItemStyles(initialOffset, currentOffset)}>{renderItem()}</div>
        </div>
    );
};

export default EditorCustomDragLayer;
