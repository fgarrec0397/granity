import { HasChildren } from "@granity/helpers";
import { Box, BoxProps, Paper, PaperProps, pxToRem } from "@granity/ui";
import { FC } from "react";

import AppBar from "./AppBar";
import SideBar from "./SideBar";

type Props = HasChildren;

type PageStyles = {
    page?: BoxProps;
    wrapper?: BoxProps;
    main?: PaperProps;
};

const styles: PageStyles = {
    page: {
        sx: {
            display: "flex",
            padding: pxToRem(0, 100),
            height: "100vh",
        },
    },
    wrapper: {
        width: "100%",
    },
    main: {
        sx: (theme) => ({
            backgroundColor: theme.palette.background.default,
            height: "650px",
        }),
    },
};

const Page: FC<Props> = ({ children }) => {
    return (
        <Box {...styles.page}>
            <SideBar />
            <Box {...styles.wrapper}>
                <AppBar />
                <Paper {...styles.main}>{children}</Paper>
            </Box>
        </Box>
    );
};

export default Page;
