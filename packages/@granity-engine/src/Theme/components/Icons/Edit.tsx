import { SvgIcon, SvgIconProps } from "@granity/ui";
import { FC } from "react";

const Edit: FC<SvgIconProps> = (props) => {
    return (
        <SvgIcon {...props}>
            <path
                d="M10.4027 5.09729L0.375 15.125V20.625H5.875L15.9027 10.5973L10.4027 5.09729Z"
                fill="currentColor"
            />
            <path
                d="M12.3472 3.15272L17.8472 8.65272L19.8608 6.63909C20.5901 5.90974 20.9999 4.92053 20.9999 3.88909C20.9999 1.7412 19.2587 0 17.1108 0C16.0793 0 15.0901 0.409743 14.3608 1.13909L12.3472 3.15272Z"
                fill="currentColor"
            />
        </SvgIcon>
    );
};

export default Edit;
