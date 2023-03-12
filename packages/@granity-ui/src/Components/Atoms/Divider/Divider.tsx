import DividerLib, { DividerProps as LibDividerProps } from "@mui/material/Divider";
import { FC } from "react";

export type DividerProps = LibDividerProps;

const Divider: FC<DividerProps> = ({ children, ...props }) => {
    return <DividerLib {...props}>{children}</DividerLib>;
};

export default Divider;
