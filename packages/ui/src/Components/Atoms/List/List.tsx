import ListLib, { ListProps as LibListProps } from "@mui/material/List";
import ListItemLib, { ListItemProps as LibListItemProps } from "@mui/material/ListItem";
import ListItemButtonLib, {
    ListItemButtonProps as LibListItemButtonProps,
} from "@mui/material/ListItemButton";
import ListItemIconLib, {
    ListItemIconProps as LibListItemIconProps,
} from "@mui/material/ListItemIcon";
import ListItemTextLib, {
    ListItemTextProps as LibListItemTextProps,
} from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import { FC } from "react";

export type ListProps = LibListProps;
export type ListItemProps = LibListItemProps;
export type ListItemButtonProps = LibListItemButtonProps;
export type ListItemIconProps = LibListItemIconProps;
export type ListItemTextProps = LibListItemTextProps;

const StyledListItemButton = styled(ListItemButtonLib)`
    &.Mui-selected,
    &.Mui-selected:hover,
    &.Mui-selected:focus {
        background-color: ${({ theme }) => theme.palette.action.selected};
    }
`;

const List: FC<ListProps> = (props) => {
    return <ListLib {...props} />;
};

export const ListItem: FC<ListItemProps> = (props) => {
    return <ListItemLib {...props} />;
};

export const ListItemButton: FC<ListItemButtonProps> = (props) => {
    return <StyledListItemButton {...props} />;
};

export const ListItemIcon: FC<ListItemIconProps> = (props) => {
    return <ListItemIconLib {...props} />;
};

export const ListItemText: FC<ListItemTextProps> = (props) => {
    return <ListItemTextLib {...props} />;
};

export default List;
