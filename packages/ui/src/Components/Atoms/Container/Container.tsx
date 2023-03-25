import ContainerLib, { ContainerProps as LibContainerProps } from "@mui/material/Container";
import { FC } from "react";

export type ContainerProps = LibContainerProps;

const Container: FC<ContainerProps> = (props) => {
    return <ContainerLib {...props} />;
};

export default Container;
