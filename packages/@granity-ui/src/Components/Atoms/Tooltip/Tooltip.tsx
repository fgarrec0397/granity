import TooltipLib, { TooltipProps as LibTooltipProps } from "@mui/material/Tooltip";
import { FC } from "react";

export type TooltipProps = LibTooltipProps;

const Tooltip: FC<TooltipProps> = ({ children, ...props }) => {
    return <TooltipLib {...props}>{children}</TooltipLib>;
};

export default Tooltip;
