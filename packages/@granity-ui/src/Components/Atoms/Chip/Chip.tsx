import ChipLib, { ChipProps as LibChipProps } from "@mui/material/Chip";
import { FC } from "react";

export type ChipProps = LibChipProps;

const Chip: FC<ChipProps> = (props) => {
    return <ChipLib {...props} />;
};

export default Chip;
