import BreadcrumbsLib, { BreadcrumbsProps as LibBreadcrumbsProps } from "@mui/material/Breadcrumbs";
import { FC } from "react";

export type BreadcrumbsProps = LibBreadcrumbsProps;

const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
    return <BreadcrumbsLib {...props} />;
};

export default Breadcrumbs;
