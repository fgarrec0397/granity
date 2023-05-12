"use client";

import { HasChildren } from "@granity/helpers";
import { CssBaseline } from "@granity/ui";

type Props = HasChildren;

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <head>
                <link rel="manifest" href="/static/manifest.json" />
            </head>
            <body>
                <CssBaseline />
                {children}
            </body>
        </html>
    );
}
