import { Identifier, useDrag, useDrop, XYCoord } from "@granity/draggable";
import Delete from "@granity/icons/Delete";
import Star from "@granity/icons/Star";
import Visibility from "@granity/icons/Visibility";
import VisibilityOff from "@granity/icons/VisibilityOff";
import { IconButton, ListItem, ListItemButton, pxToRem } from "@granity/ui";
import { ReactElement, useRef } from "react";

export const ItemTypes = {
    CARD: "card",
};

interface DragItem {
    index: number;
    id: string;
    type: string;
}

export type EditorItemsListItemProps = {
    id: string;
    index: number;
    itemName?: string;
    editModal?: (id: string) => ReactElement;
    isVisible?: (id: string) => boolean | undefined;
    isDefault?: (id: string) => boolean | undefined;
    handleVisibility?: (id: string) => void;
    handleClickRow?: (id: string) => void;
    handleClickRemove?: (id: string) => void;
    isActionRowSelected?: (id: string) => boolean;
    moveItem?: (dragIndex: number, hoverIndex: number) => void;
};

const EditorItemsListItem = ({
    id,
    index,
    itemName,
    editModal,
    handleVisibility,
    isVisible,
    handleClickRemove,
    isDefault,
    handleClickRow,
    isActionRowSelected,
    moveItem,
}: EditorItemsListItemProps) => {
    const ref = useRef<HTMLLIElement>(null);
    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: DragItem, monitor) {
            console.log(item, "item");

            const dragIndex = item.index;
            const hoverIndex = index;

            if (!ref.current) {
                return;
            }
            if (!moveItem) {
                return;
            }

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            moveItem(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    return (
        <ListItem
            key={id}
            ref={ref}
            data-handler-id={handlerId}
            sx={{
                opacity: isDragging ? 0 : 1,
            }}
            secondaryAction={
                <>
                    {editModal?.(id)}
                    {handleVisibility && (
                        <IconButton onClick={() => handleVisibility?.(id)}>
                            {isVisible?.(id) ? (
                                <Visibility fontSize="small" />
                            ) : (
                                <VisibilityOff fontSize="small" />
                            )}
                        </IconButton>
                    )}
                    <IconButton onClick={() => handleClickRemove?.(id)}>
                        <Delete fontSize="small" />
                    </IconButton>
                </>
            }
            disablePadding
        >
            <ListItemButton
                onClick={() => handleClickRow?.(id)}
                selected={isActionRowSelected?.(id)}
            >
                {itemName}
                {isDefault?.(id) && (
                    <Star
                        sx={{
                            fontSize: 10,
                            marginLeft: pxToRem(5),
                        }}
                    />
                )}
            </ListItemButton>
        </ListItem>
    );
};

export default EditorItemsListItem;
