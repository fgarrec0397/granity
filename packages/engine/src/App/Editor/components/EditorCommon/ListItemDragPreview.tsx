import { Box, pxToRem, useTheme } from "@granity/ui";
import type { CSSProperties, FC } from "react";
import { memo } from "react";

import { EditorListDragItem } from "../../_actions/editorTypes";
import EditorItemsList from "../EditorRightPanel/EditorItemsList";
import EditorItemsListItem from "../EditorRightPanel/EditorItemsListItem";
import EditWidgetModal from "./EditWidgetModal";

export interface BoxDragPreviewProps {
    dragItem: EditorListDragItem;
}

const ListItemDragPreview: FC<BoxDragPreviewProps> = ({ dragItem }) => {
    const theme = useTheme();

    const styles: CSSProperties = {
        transform: "rotate(7deg)",
        WebkitTransform: "rotate(7deg)",
        backgroundColor: theme.palette.action.selected,
        opacity: 0.25,
    };

    return (
        <EditorItemsListItem
            item={dragItem}
            index={0}
            itemName={dragItem.title}
            isDraggable={false}
            handleVisibility={() => {}}
            editModal={() => <EditWidgetModal />}
            style={styles}
            itemsDictionaryIds={[]}
            isDragging={false}
        >
            {dragItem.children?.length ? (
                <Box
                    sx={{
                        padding: pxToRem(0, 0, 0, 10),
                    }}
                >
                    <EditorItemsList
                        itemsDictionaryIds={dragItem.children}
                        noItemsText=""
                        parentId=""
                        isDragAndDropEnabled={false}
                    />
                </Box>
            ) : null}
        </EditorItemsListItem>
    );
};

export default memo(ListItemDragPreview);
