import { HasChildren } from "@granity/helpers";
import { Box, BoxProps } from "@granity-ui/Components";
import { pxToRem } from "@granity-ui/Theme";
import { FC } from "react";

import AppBar from "./AppBar";
import SideBar from "./SideBar";

type Props = HasChildren;

type PageStyles = {
    page?: BoxProps;
    wrapper?: BoxProps;
    main?: BoxProps;
};

const styles: PageStyles = {
    page: {
        sx: {
            display: "flex",
            padding: pxToRem(0, 100),
        },
    },
    wrapper: {
        width: "100%",
    },
    main: {
        sx: {
            backgroundColor: "yellow",
        },
    },
};

const Page: FC<Props> = ({ children }) => {
    return (
        <Box {...styles.page}>
            <SideBar />
            <Box {...styles.wrapper}>
                <AppBar />
                <Box {...styles.main}>{children}</Box>
            </Box>
        </Box>
    );
};

export default Page;
