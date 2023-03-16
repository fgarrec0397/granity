import MenuListLib, { MenuListProps as LibMenuListProps } from "@mui/material/MenuList";
import { FC } from "react";

export type MenuListProps = LibMenuListProps;

const MenuList: FC<MenuListProps> = ({ children, ...props }) => {
    return <MenuListLib {...props}>{children}</MenuListLib>;
};

export default MenuList;
