import BoxLib, { BoxProps as LibBoxProps } from "@mui/material/Box";
import { FC } from "react";

export type BoxProps = LibBoxProps;

const Box: FC<BoxProps> = (props) => {
    return <BoxLib {...props} />;
};

export default Box;
