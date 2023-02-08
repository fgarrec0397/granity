import ListLib, { ListProps as LibListProps } from "@mui/material/List";
import ListItemLib, { ListItemProps as LibListItemProps } from "@mui/material/ListItem";
import ListItemButtonLib, {
    ListItemButtonProps as LibListItemButtonProps,
} from "@mui/material/ListItemButton";
import ListItemIconLib, {
    ListItemIconProps as LibListItemIconProps,
} from "@mui/material/ListItemIcon";
import { FC } from "react";

export type ListProps = LibListProps;
export type ListItemProps = LibListItemProps;
export type ListItemButtonProps = LibListItemButtonProps;
export type ListItemIconProps = LibListItemIconProps;

const List: FC<ListProps> = (props) => {
    return <ListLib {...props} />;
};

export const ListItem: FC<ListItemProps> = (props) => {
    return <ListItemLib {...props} />;
};

export const ListItemButton: FC<ListItemButtonProps> = (props) => {
    return <ListItemButtonLib {...props} />;
};

export const ListItemIcon: FC<ListItemIconProps> = (props) => {
    return <ListItemIconLib {...props} />;
};

export default List;
