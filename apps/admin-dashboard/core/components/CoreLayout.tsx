import { HasChildren } from "@granity/helpers";
import { FC } from "react";

type Props = HasChildren;

const CoreLayout: FC<Props> = ({ children }) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
};

export default CoreLayout;
