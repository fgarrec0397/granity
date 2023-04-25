import { HasChildren } from "@granity/helpers";
import { FC } from "react";

type Props = HasChildren;

const CoreLayout: FC<Props> = ({ children }) => {
    return (
        <html lang="en">
            <body
                className={
                    process.env.HIDE_NEXT_ERROR_OVERLAY === "true"
                        ? "hide-nextjs-portal"
                        : undefined
                }
            >
                {children}
            </body>
        </html>
    );
};

export default CoreLayout;
