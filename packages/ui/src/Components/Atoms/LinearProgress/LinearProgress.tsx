import LinearProgressLib, {
    LinearProgressProps as LibLinearProgressProps,
} from "@mui/material/LinearProgress";
import { FC } from "react";

export type LinearProgressProps = LibLinearProgressProps;

const LinearProgress: FC<LinearProgressProps> = (props) => {
    return <LinearProgressLib {...props} />;
};

export default LinearProgress;
