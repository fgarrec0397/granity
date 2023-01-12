import { FC, memo } from "react";

type Props = {
    backgroundColor?: string;
    color?: string;
};

const Play: FC<Props> = ({ backgroundColor = "#292929", color = "#A5A5A5" }) => {
    return (
        <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="15.5" cy="15.5" r="15.5" fill={backgroundColor} />
            <path
                d="M16.6 19.8H23.3333C23.7 19.8 24 20.1 24 20.4667V22.3667C24 22.7333 23.7 23.0333 23.3333 23.0333H16.6C16.2333 23.0333 15.9333 22.7333 15.9333 22.3667V20.4667C15.9333 20.1 16.2333 19.8 16.6 19.8Z"
                fill={color}
            />
            <path
                d="M8.66667 12.0667H23.3333C23.7 12.0667 24 12.3667 24 12.7333V17.2667C24 17.6333 23.7 17.9333 23.3333 17.9333H8.66667C8.3 17.9333 8 17.6333 8 17.2667V12.7333C8 12.3667 8.3 12.0667 8.66667 12.0667Z"
                fill={color}
            />
            <path
                d="M8.66667 7H15.4C15.7667 7 16.0667 7.3 16.0667 7.66667V9.56667C16.0667 9.93333 15.7667 10.2333 15.4 10.2333H8.66667C8.3 10.2333 8 9.93333 8 9.56667V7.66667C8 7.3 8.3 7 8.66667 7Z"
                fill={color}
            />
        </svg>
    );
};

export default memo(Play);
