import { FC, memo } from "react";

const Arrow: FC = () => {
    return (
        <svg
            width="13"
            height="6"
            viewBox="0 0 13 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M6.5 6L0.870835 0.75L12.1292 0.750001L6.5 6Z" fill="currentColor" />
        </svg>
    );
};

export default memo(Arrow);
