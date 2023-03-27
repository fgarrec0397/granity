import LinkLib, { LinkProps as LibLinkProps } from "@mui/material/Link";
import { FC } from "react";

export type LinkProps = LibLinkProps;

const Link: FC<LinkProps> = (props) => {
    return <LinkLib {...props} />;
};

export default Link;
