import MenuLib, { MenuProps as LibMenuProps } from "@mui/material/Menu";
import { FC } from "react";

export type MenuProps = LibMenuProps;

const Menu: FC<MenuProps> = ({ children, ...props }) => {
    return <MenuLib {...props}>{children}</MenuLib>;
};

export default Menu;
