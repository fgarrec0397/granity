import TypographyLib, { TypographyProps as LibTypographyProps } from "@mui/material/Typography";
import { FC } from "react";

export type TypographyProps = LibTypographyProps;

const Typography: FC<TypographyProps> = (props) => {
    return <TypographyLib {...props} />;
};

export default Typography;
