"use client";

import { Box, BoxProps, Typography, TypographyProps } from "@granity/ui";

import Page from "../core/components/Page";

type HomePageStyles = {
    wrapper?: BoxProps;
    text?: TypographyProps;
};

const styles: HomePageStyles = {
    wrapper: {
        sx: {
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    },
    text: {
        sx: {
            fontSize: "large",
            fontWeight: "bold",
        },
    },
};

const HomePage = () => {
    return (
        <Page>
            <Box {...styles.wrapper}>
                <Typography {...styles.text}>Home</Typography>
            </Box>
        </Page>
    );
};

export default HomePage;
