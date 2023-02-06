import { FC, memo } from "react";

type Props = {
    backgroundColor?: string;
    arrowColor?: string;
};

const Play: FC<Props> = ({ backgroundColor = "#292929", arrowColor = "#A5A5A5" }) => {
    return (
        <svg
            width="55"
            height="55"
            viewBox="0 0 55 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="27.5" cy="27.5" r="27.5" fill={backgroundColor} />
            <path
                d="M37.5855 24.5857L23.1435 14.6987C22.4765 14.2418 21.8045 14 21.2459 14C20.1661 14 19.498 14.8667 19.498 16.3174V37.686C19.498 39.135 20.1652 40 21.2426 40C21.802 40 22.4633 39.758 23.1317 39.2998L37.5804 29.4131C38.5096 28.7762 39.0242 27.9192 39.0242 26.9988C39.0244 26.0791 38.5157 25.2223 37.5855 24.5857Z"
                fill={arrowColor}
            />
        </svg>
    );
};

export default memo(Play);
