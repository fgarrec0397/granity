import { useTheme } from "@granity/ui";
import type { CSSProperties, FC } from "react";
import { memo } from "react";

import EditorItemsListItem from "../EditorRightPanel/EditorItemsListItem";
import EditWidgetModal from "./EditWidgetModal";

export interface BoxDragPreviewProps {
    title: string;
    id: string;
}

const ListItemDragPreview: FC<BoxDragPreviewProps> = memo(function BoxDragPreview({ id, title }) {
    const theme = useTheme();

    const styles: CSSProperties = {
        transform: "rotate(7deg)",
        WebkitTransform: "rotate(7deg)",
        backgroundColor: theme.palette.action.selected,
    };

    return (
        <EditorItemsListItem
            id={id}
            index={0}
            itemName={title}
            isDraggable={false}
            handleVisibility={() => {}}
            editModal={() => <EditWidgetModal />}
            additionalStyles={styles}
        />
    );
});

export default ListItemDragPreview;
