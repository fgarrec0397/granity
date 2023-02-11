import PaperLib, { PaperProps as LibPaperProps } from "@mui/material/Paper";
import { FC } from "react";

export type PaperProps = LibPaperProps;

const Paper: FC<PaperProps> = (props) => {
    return <PaperLib {...props} />;
};

export default Paper;
