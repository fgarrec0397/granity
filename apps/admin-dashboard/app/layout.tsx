"use client";

import { GranityEngineProvider } from "@granity/engine";
import { ProvidersBuilder, QueryClient, QueryClientProvider } from "@granity/helpers";
import { granityConfig } from "config/granity";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import AppBar from "./AppBar";
interface IProps {
    children: ReactNode;
}

const queryClient = new QueryClient();

export default function RootLayout({ children }: IProps) {
    const Providers = ProvidersBuilder([
        [SessionProvider],
        [QueryClientProvider, { client: queryClient }],
        [GranityEngineProvider, { config: granityConfig }],
    ]);

    return (
        <html lang="en">
            <body>
                <Providers>
                    <AppBar />
                    <div className={"  h-screen "}>{children}</div>
                </Providers>
            </body>
        </html>
    );
}
