import { styled } from "@mui/material";
import BoxLib, { BoxProps as LibBoxProps } from "@mui/material/Box";
import { FC } from "react";

export type BoxProps = LibBoxProps & {
    hasBackground?: boolean;
};

const StyledBox = styled(BoxLib)<BoxProps>(({ hasBackground, theme }) => ({
    backgroundColor: hasBackground ? theme.palette.background.paper : undefined,
}));

const Box: FC<BoxProps> = ({ hasBackground = true, ...props }) => {
    return <StyledBox hasBackground={hasBackground} {...props} />;
};

export default Box;
