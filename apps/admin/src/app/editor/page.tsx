"use client";
import { GranityEngine } from "@granity/engine";
import { Box } from "@granity/ui";

const EditorPage = () => {
    return (
        <>
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
                <GranityEngine />
            </Box>
        </>
    );
};

export default EditorPage;
