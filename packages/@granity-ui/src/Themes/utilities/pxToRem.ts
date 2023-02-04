import { Theme } from "@mui/material";

export default (size: number) =>
    ({ theme }: { theme: Theme }) =>
        theme.custom.layout.pxToRem(size);
