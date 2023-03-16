import AvatarLib, { AvatarProps as LibAvatarProps } from "@mui/material/Avatar";
import { FC } from "react";

export type AvatarProps = LibAvatarProps;

const Avatar: FC<AvatarProps> = ({ children, ...props }) => {
    return <AvatarLib {...props}>{children}</AvatarLib>;
};

export default Avatar;
