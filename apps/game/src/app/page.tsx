"use client";

import { GranityEngineProvider, GranityGame } from "@granity/engine";
import { Box, CssBaseline } from "@granity/ui";

import { granityConfig } from "../config/granity";

const HomePage = () => {
    return (
        <Box
            sx={{
                "& > div:first-child": {
                    minHeight: "100vh",
                    "& > div": {
                        minHeight: "100vh",
                    },
                },
            }}
        >
            <CssBaseline />
            <GranityEngineProvider config={granityConfig}>
                <GranityGame />
            </GranityEngineProvider>
        </Box>
    );
};

export default HomePage;
