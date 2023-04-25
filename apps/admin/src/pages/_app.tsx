import { Box } from "@granity/ui";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Box
                sx={{
                    "nextjs-portal": {
                        display: "none",
                    },
                }}
            >
                <Component {...pageProps} />
            </Box>
        </>
    );
}
