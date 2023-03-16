import SvgIconLib, { SvgIconProps as LibSvgIconProps } from "@mui/material/SvgIcon";
import { FC } from "react";

export type SvgIconProps = LibSvgIconProps;

export const SvgIcon: FC<SvgIconProps> = (props) => {
    return <SvgIconLib {...props} />;
};
