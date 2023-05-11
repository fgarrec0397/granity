import { FC, memo } from "react";

type CheckFillProps = {
    color1?: string;
    color2?: string;
};

const CheckFill: FC<CheckFillProps> = ({ color1 = "#000000", color2 = "#ffffff" }) => {
    return (
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4.5" cy="4.5" r="4.5" fill={color1} />
            <mask
                id="mask0_409_912"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="1"
                y="1"
                width="7"
                height="7"
            >
                <path d="M8 1H1V8H8V1Z" fill={color2} />
            </mask>
            <g mask="url(#mask0_409_912)">
                <path
                    d="M6.8335 3.04169L3.91683 5.95836L2.4585 4.50003"
                    stroke={color2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};

export default memo(CheckFill);
