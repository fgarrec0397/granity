import { styled } from "@mui/material";
import MenuItemLib, { MenuItemProps as LibMenuItemProps } from "@mui/material/MenuItem";
import { FC } from "react";

export type MenuItemProps = LibMenuItemProps;

const StyledMenuItem = styled(MenuItemLib)`
    &.Mui-selected,
    &.Mui-selected:hover,
    &.Mui-selected:focus {
        background-color: ${({ theme }) => theme.palette.action.selected};
    }
`;

const MenuItem: FC<MenuItemProps> = ({ children, ...props }) => {
    return <StyledMenuItem {...props}>{children}</StyledMenuItem>;
};

export default MenuItem;
