import GridLib, { GridProps as LibGridProps } from "@mui/material/Grid";
import { FC } from "react";

export type GridProps = LibGridProps;

const Grid: FC<GridProps> = (props) => {
    return <GridLib {...props} />;
};

export default Grid;
