import { FC, memo } from "react";

type ClockFillProps = {
    color1?: string;
    color2?: string;
};

const ClockFill: FC<ClockFillProps> = ({ color1 = "#000000", color2 = "#ffffff" }) => {
    return (
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4.50029" cy="4.50005" r="4.2" fill={color2} />
            <path
                d="M4.5 0C2.0205 0 0 2.0205 0 4.5C0 6.9795 2.0205 9 4.5 9C6.9795 9 9 6.9795 9 4.5C9 2.0205 6.9795 0 4.5 0ZM6.4575 6.1065C6.3945 6.2145 6.282 6.273 6.165 6.273C6.1065 6.273 6.048 6.2595 5.994 6.2235L4.599 5.391C4.2525 5.184 3.996 4.7295 3.996 4.329V2.484C3.996 2.2995 4.149 2.1465 4.3335 2.1465C4.518 2.1465 4.671 2.2995 4.671 2.484V4.329C4.671 4.491 4.806 4.7295 4.9455 4.8105L6.3405 5.643C6.5025 5.7375 6.5565 5.9445 6.4575 6.1065Z"
                fill={color1}
            />
        </svg>
    );
};

export default memo(ClockFill);
