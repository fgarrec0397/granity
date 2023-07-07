import BoxLib, { BoxProps as LibBoxProps } from "@mui/material/Box";
import { FC, forwardRef } from "react";

export type BoxProps = LibBoxProps;

const Box: FC<BoxProps> = forwardRef<any, BoxProps>((props, ref) => {
    return <BoxLib ref={ref} {...props} />;
});

Box.displayName = "Box";

export default Box;
