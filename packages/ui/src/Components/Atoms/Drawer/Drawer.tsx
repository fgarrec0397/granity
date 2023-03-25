import DrawerLib, { DrawerProps as LibDrawerProps } from "@mui/material/Drawer";
import { FC } from "react";

export type DrawerProps = LibDrawerProps;

const Drawer: FC<DrawerProps> = (props) => {
    return <DrawerLib {...props} />;
};

export default Drawer;
